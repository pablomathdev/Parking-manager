import fs from 'fs/promises'
import path from 'path'
import request from 'supertest'
import DatabaseJson from '../../data/db/database-json'
import app from '../config/app'

describe('start parking', () => {
  afterEach(async () => {
    await new DatabaseJson('vehicle').clear()
    await new DatabaseJson('ticket').clear()
  })
  afterAll(async () => {
    const directory = path.join(__dirname, '../generate-ticket/view/')

    for (const file of await fs.readdir(directory)) {
      await fs.unlink(path.join(directory, file))
    }
  })
  test('should returns 201 if vehicle added', async () => {
    await request(app).post('/start').send({
      email: 'anyemail@gmail.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }).expect(201)
  })
  test('should returns 400 if email is invalid', async () => {
    await request(app).post('/start').send({
      email: 'anyemailgmail.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }).expect(400)
  })
})
