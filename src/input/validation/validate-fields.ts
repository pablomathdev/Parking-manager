/* eslint-disable no-useless-escape */
import Validation from '../protocols/validation'

export default class ValidateFields implements Validation {
  validate (input: any): Error | null {
    const requiredFields = [
      'email',
      'licensePlate',
      'type']

    for (const field of requiredFields) {
      if (!input[field]) {
        return new Error('fill in all fields !')
      }
    }
    const validEmail = /^\S+@\S+\.\S+$/.test(input.email)
    if (!validEmail) {
      return new Error('Invalid email !')
    }
    return null
  }
}
