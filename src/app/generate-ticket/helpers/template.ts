/* eslint-disable quote-props */
export const source =
'<p>ticket:{{ticket}}</p>' +
'<br>' +
'<p>licensePlate:{{licensePlate}}</p>' +
'<br>' +
'<p>Hour:{{created_at}}</p>' +
'<br>' +
'<p>type:{{type}}</p>' +
'<br>' +
'<img src="{{img}}">'

export function content (
  ticket: string,
  licensePlate: string,
  created_at: string,
  type: string): object {
  return {
    'ticket': `${ticket}`,
    'licensePlate': `${licensePlate}`,
    'created_at': `${created_at}`,
    'type': `${type}`,
    'img': `../codebar/codebar${ticket}.png`
  }
}

// const data = {
//   ticket: `${ticket}`,
//   licensePlate: `${licensePlate}`,
//   hour: `${created_at}`,
//   type: `${type}`,
//   img: `../tmp/codebar${ticket}.png`
// }
