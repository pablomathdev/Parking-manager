import DatabaseJson from './database'

const item = {
  id: '1',
  name: 'any_name',
  email: 'any_email'
}

describe('Database', () => {
  afterEach(async () => {
    await new DatabaseJson('test').clear()
  })
  test('should save item in json', async () => {
    const sut = new DatabaseJson('test')

    const result = await sut.save(item)
    expect(result).toEqual(item)
  })
  test('should not save if item already exists', async () => {
    const sut = new DatabaseJson('test')
    await sut.save(item)
    const result = await sut.save(item)
    expect(result).toEqual(new Error('item already exists !'))
  })
})
