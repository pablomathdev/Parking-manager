import fs from 'fs/promises'
import path from 'path'

// interface Vehicle {
//   id?: string
//   driver: string
//   name: string
//   model: string
//   licensePlate: string
//   type: string
//   start_date: string
//   end_date: Date | null

// }

class Database {
  private readonly file: string

  constructor (file: string) {
    this.file = file
  }

  async getFile (): Promise<any> {
    const filename = path.join(__dirname + '/' + `${this.file}.json`)
    const data = await fs.readFile(filename, { encoding: 'utf-8' })
    return JSON.parse(data.toString())
  }

  async writeFile (data: any): Promise<void> {
    const filename = path.join(__dirname + '/' + `${this.file}.json`)
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
    const filename = path.join(__dirname + '/' + `${this.file}.json`)
    await fs.writeFile(filename, JSON.stringify([]))
  }
}

const item = {
  id: '1',
  name: 'any_name',
  email: 'any_email'
}

describe('Database', () => {
  afterEach(async () => {
    await new Database('test').clear()
  })
  test('should save item in json', async () => {
    const sut = new Database('test')

    const result = await sut.save(item)
    expect(result).toEqual(item)
  })
})
