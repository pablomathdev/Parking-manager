import fs from 'fs/promises'
import path from 'path'

export default class Database {
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
    const item = allData.find((item: { id: string }) => item.id === element.id)
    if (item) {
      return new Error('item already exists !')
    }
    if (!item) {
      await this.writeFile([...allData, element])
      return element
    }
  }

  async clear (): Promise<void> {
    const filename = path.join(__dirname + '/collections/' + `${this.file}.json`)
    await fs.writeFile(filename, JSON.stringify([]))
  }
}
