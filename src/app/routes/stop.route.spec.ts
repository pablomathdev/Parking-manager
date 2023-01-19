import request from 'supertest'
import app from '../config/app'
import 'custom-uuid'
import fs from 'fs/promises'
import path from 'path'
import MockDate from 'mockdate'
import dayjs from 'dayjs'
jest.mock('custom-uuid', () => ({ generateCustomUuid: () => '0123456789' }))
MockDate.set(
  dayjs('Fri, Jan 13, 2023 10:51 AM').format('ddd, MMM D, YYYY h:mm A')
)

describe('stop parking', () => {
  beforeAll(async () => {
    const filenameVehicle = path.join(
      __dirname,
      '../../data/db' + '/collections/' + 'vehicle.json'
    )
    const filenameTicket = path.join(
      __dirname,
      '../../data/db' + '/collections/' + 'ticket.json'
    )
    await fs.writeFile(
      filenameVehicle,
      JSON.stringify([
        {
          id: 'any_id_vehicle',
          start_date: 'Fri, Jan 13, 2023 10:36 AM',
          end_date: null,
          ticket: {
            id: 'any_id',
            ticket: '0123456789'
          },
          email: 'anyemail@gmail.com',
          licensePlate: 'XXXXX',
          type: 'any_type'
        }
      ])
    )
    await fs.writeFile(
      filenameTicket,
      JSON.stringify([
        {
          id: 'any_id',
          id_vehicle: 'any_id_vehicle',
          type: 'any_type',
          licensePlate: 'XXXXX',
          ticket: '0123456789',
          created_at: dayjs().format('MM/DD/YYYY'),
          hour: dayjs().format('h:mm:ss A')
        }
      ])
    )
  })
  test('should returns 200 if ticket exists', async () => {
    await request(app)
      .post('/stop')
      .send({
        ticket: '0123456789'
      })
      .expect(200)
  })
})
