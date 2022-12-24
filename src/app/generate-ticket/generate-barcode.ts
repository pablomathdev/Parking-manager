import { createCanvas } from 'canvas'
import JsBarcode from 'jsbarcode'

export class GenerateBarCode {
  static async generate (value: string): Promise<string> {
    const canvas = createCanvas(100, 100)
    JsBarcode(canvas, value, { displayValue: false })
    let pngUrl = canvas.toDataURL() // base64
    return pngUrl
  }
}
