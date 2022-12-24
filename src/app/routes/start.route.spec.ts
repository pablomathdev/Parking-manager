
import request from 'supertest'
import DatabaseJson from '../../data/db/database-json'
import app from '../config/app'
describe('start parking', () => {
  afterEach(async () => {
    await new DatabaseJson('vehicle').clear()
    await new DatabaseJson('ticket').clear()
  })
  test('should returns 201 if vehicle added', async () => {
    await request(app).post('/start').send({
      email: 'anyemail@gmail.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }).expect(201)
  })
})
