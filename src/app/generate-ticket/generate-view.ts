import fs from 'fs/promises'
import path from 'path'
import Handlebars from 'handlebars'

export class GenerateView {
  async generate (source: string, input: any): Promise<void> {
    const template = Handlebars.compile(source)
    const result = template(input)
    await fs.writeFile(path.join(__dirname + '/view/' + `view${input.ticket}` + '.html'), result)
  }
}
