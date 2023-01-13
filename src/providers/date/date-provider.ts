import dayjs from 'dayjs'

export default class DateProvider {
  static dateNow (): any {
    return dayjs().format('ddd, MMM D, YYYY h:mm A')
  }

  static compare (dateOne: string, dateTwo: string): number {
    const date1 = dayjs(dateOne)
    const date2 = dayjs(dateTwo)
    return date1.diff(date2, 'minutes')
  }
}
