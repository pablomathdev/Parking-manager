import calcPricePerHour from './calc-price-per-hour'
import MockDate from 'mockdate'
import dayjs from 'dayjs'
MockDate.set(
  dayjs('Wed, Jan 25, 2023 10:50 AM').format('ddd, MMM D, YYYY h:mm A')
)

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
  test('should return price per hour', () => {
    const result = calcPricePerHour('Car', 'Wed, Jan 25, 2023 8:00 AM')
    expect(result).toBe(6)
  })
})
