/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import fs from 'fs/promises'
import path from 'path'
import Handlebars from 'handlebars'
import { createCanvas } from 'canvas'
import JsBarcode from 'jsbarcode'
export class GenerateView {
  async generate (source: string, input: any): Promise<void> {
    const template = Handlebars.compile(source)
    const result = template(input)
    await fs.writeFile(path.join(__dirname + '/view/' + `view${input.ticket}` + '.html'), result)
  }
}
export class GenerateBarCode {
  async generate (value: string): Promise<void> {
    const canvas = createCanvas(100, 100)
    JsBarcode(canvas, value)
    const buffer = canvas.toBuffer('image/png')
    await fs.writeFile(path.join(__dirname + '/tmp/' + `codebar${value}` + '.png'), buffer)
  }
}
