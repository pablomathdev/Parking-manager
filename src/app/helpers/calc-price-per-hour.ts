import DateProvider from '../../providers/date/date-provider'
import dayjs from 'dayjs'

export default function calcPricePerHour (typeVehicle: string, end_date: string): number {
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
