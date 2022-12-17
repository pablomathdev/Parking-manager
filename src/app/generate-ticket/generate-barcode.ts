import { createCanvas } from 'canvas'
import JsBarcode from 'jsbarcode'
import fs from 'fs/promises'
import path from 'path'

export class GenerateBarCode {
  async generate (value: string): Promise<void> {
    const canvas = createCanvas(100, 100)
    JsBarcode(canvas, value)
    const buffer = canvas.toBuffer('image/png')
    await fs.writeFile(path.join(__dirname + '/codebar/' + `codebar${value}` + '.png'), buffer)
  }
}
