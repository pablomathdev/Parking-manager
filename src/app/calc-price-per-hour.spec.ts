import dayjs from 'dayjs'
import DateProvider from '../providers/date/date-provider'
import MockDate from 'mockdate'
MockDate.set(
  dayjs('Wed, Jan 25, 2023 10:50 AM').format('ddd, MMM D, YYYY h:mm A')
)

function calcPricePerHour (typeVehicle: string, end_date: string): number {
  let price = 0
  const minutes = DateProvider.compare(DateProvider.dateNow(), end_date)
  let hours = dayjs().diff(end_date, 'hour')
  if (hours === 0) {
    hours = 1
  }

  if (minutes <= 15) {
    return price
  }
  if (minutes > 15 && typeVehicle === 'Car') {
    price = 3 * hours
  }
  if (minutes > 15 && typeVehicle === 'Motocycle') {
    price = 2 * hours
  }
  return price
}

describe('Calculate price per hour of parking', () => {
  test('if you exceed the 15 minutes of tolerance, you must return the value of one hour', () => {
    const resultMotocycle = calcPricePerHour('Motocycle', 'Wed, Jan 25, 2023 10:34 AM')
    const resultCar = calcPricePerHour('Car', 'Wed, Jan 25, 2023 10:34 AM')
    expect(resultMotocycle).toBe(2)
    expect(resultCar).toBe(3)
  })
  test('should return 0 if vehicle type is Motorcycle and still within the 15 minute tolerance', () => {
    const result = calcPricePerHour('Motocycle', 'Wed, Jan 25, 2023 10:35 AM')
    expect(result).toBe(0)
  })
  test('should return 0 if vehicle type is Car and still within the 15 minute tolerance', () => {
    const result = calcPricePerHour('Car', 'Wed, Jan 25, 2023 10:35 AM')
    expect(result).toBe(0)
  })
})
