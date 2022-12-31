import * as dotenv from 'dotenv'
import path from 'path'

export default dotenv.config({ path: path.join(__dirname, '../../.env') })
