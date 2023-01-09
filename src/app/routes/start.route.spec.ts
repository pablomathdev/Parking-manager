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
  test('should returns 400 if email is invalid', async () => {
    await request(app).post('/start').send({
      email: 'anyemailgmail.com',
      licensePlate: 'XXXXX',
      type: 'any_type'
    }).expect(400)
  })
  test('should returns 400 if any field no is provided', async () => {
    await request(app).post('/start').send({
      email: 'anyemail@gmail.com',
      type: 'any_type'
    }).expect(400)
  })
})
