export function generateBarcode (value: string): string {
  return `https://barcode.tec-it.com/barcode.ashx?data=${value}&code=Code25IL&eclevel=L`
}
