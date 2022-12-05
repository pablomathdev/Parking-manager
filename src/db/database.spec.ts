import fs from 'fs/promises'

import path from 'path'
class Database {
  constructor (private readonly file: string) {
    this.file = file
  }

  async getFile (): Promise<string> {
    const filename = path.join(__dirname, './', this.file)
    const file = await fs.readFile(filename, { encoding: 'utf-8' })
    return JSON.parse(file)
  }
}

const systemUnderTestFactory = (file: string): any => {
  return new Database(file)
}

describe('Database', () => {
  test('should read file', async () => {
    const sut = systemUnderTestFactory('vehicle.json')

    const result = await sut.getFile()
    expect(result).toEqual([
      {
        id: '1',
        driver: 'any_driver',
        name: 'any_name',
        model: 'any_model',
        licensePlate: 'XXXXXX',
        type: 'car',
        start_date: 'now',
        end_date: null
      }
    ])
  })
})
