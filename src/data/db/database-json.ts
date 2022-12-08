import fs from 'fs/promises'
import path from 'path'
import Database from '../../domain/interfaces/database-interface'

export default class DatabaseJson implements Database {
  private readonly file: string

  constructor (file: string) {
    this.file = file
  }

  async getFile (): Promise<any> {
    const filename = path.join(__dirname + '/collections/' + `${this.file}.json`)
    const data = await fs.readFile(filename, { encoding: 'utf-8' })
    return JSON.parse(data.toString())
  }

  async writeFile (data: any): Promise<void> {
    const filename = path.join(__dirname + '/collections/' + `${this.file}.json`)
    await fs.writeFile(filename, JSON.stringify(data))
  }

  async save (element: any): Promise<any> {
    const allData = await this.getFile()
    const itemAlreadyExists = await this.findById(element.id)
    if (itemAlreadyExists) {
      return new Error('item already exists !')
    }
    if (!itemAlreadyExists) {
      await this.writeFile([...allData, element])
      return element
    }
  }

  async findById (id: string): Promise<any> {
    const allData = await this.getFile()
    const item = allData.find((item: { id: string }) => item.id === id)
    return item
  }

  async update (id: string, updates: any): Promise<any> {
    const allData = await this.getFile()
    const updateDates = allData.map(
      (item: { id: string }) => item.id === id ? { ...item, ...updates } : new Error('item does not exists !'))
    await this.writeFile(updateDates)
    return await this.findById(id)
  }

  async clear (): Promise<void> {
    const filename = path.join(__dirname + '/collections/' + `${this.file}.json`)
    await fs.writeFile(filename, JSON.stringify([]))
  }
}
