import request from 'supertest'
import app from '../config/app'
import 'custom-uuid'
import fs from 'fs/promises'
import path from 'path'
import MockDate from 'mockdate'
import dayjs from 'dayjs'
import DatabaseVehicle from '../../data/db/database-vehicle'
import DatabaseJson from '../../data/db/database-json'
import DateProvider from '../../providers/date/date-provider'

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
          created_at: DateProvider.monthyDayYear(),
          hour: DateProvider.hourMinutesSeconds()
        }
      ])
    )
  })
  afterAll(async () => {
    await new DatabaseVehicle('vehicle').clear()
    await new DatabaseJson('ticket').clear()
  })
  test('should returns 200(OK) if ticket exists', async () => {
    await request(app)
      .post('/stop')
      .send({
        ticket: '0123456789'
      })
      .expect(200)
  })
  test('should returns 404(Not found) if ticket not exists', async () => {
    await request(app)
      .post('/stop')
      .send({
        ticket: '012345678'
      })
      .expect(404)
  })
})
