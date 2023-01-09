"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/* eslint-disable no-useless-escape */

class ValidateFields {
  validate(input) {
    const requiredFields = ['email', 'licensePlate', 'type'];
    for (const field of requiredFields) {
      if (!input[field]) {
        return new Error('fill in all fields !');
      }
    }
    const validEmail = /^\S+@\S+\.\S+$/.test(input.email);
    if (!validEmail) {
      return new Error('Invalid email !');
    }
    return null;
  }
}
exports.default = ValidateFields;