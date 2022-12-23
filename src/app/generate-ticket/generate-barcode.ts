import { createCanvas } from 'canvas'
import JsBarcode from 'jsbarcode'

export class GenerateBarCode {
  static async generate (value: string): Promise<string> {
    const canvas = createCanvas(100, 100)
    JsBarcode(canvas, value, { displayValue: false })
    // const buffer = canvas.toBuffer('image/png')
    let pngUrl = canvas.toDataURL()
    return pngUrl
    // await fs.writeFile(path.join(__dirname + '/codebar/' + `codebar${value}` + '.png'), buffer)
  }
}
