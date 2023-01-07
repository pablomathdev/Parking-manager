"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validate_fields_1 = __importDefault(require("./validate-fields"));
describe('Validate Fields', () => {
    test('should return an error if email is not provided', () => {
        const sut = new validate_fields_1.default();
        const request = {
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        const result = sut.validate(request);
        expect(result).toEqual(new Error('fill in all fields !'));
    });
    test('should return an error if no field is provided', () => {
        const sut = new validate_fields_1.default();
        const request = {};
        const result = sut.validate(request);
        expect(result).toEqual(new Error('fill in all fields !'));
    });
    test('should return an error if email is invalid', () => {
        const sut = new validate_fields_1.default();
        const request = {
            email: 'invalidemailgmail.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        const result = sut.validate(request);
        expect(result).toEqual(new Error('Invalid email !'));
    });
    test('should return null if email is valid', () => {
        const sut = new validate_fields_1.default();
        const request = {
            email: 'validemail@gmail.com',
            licensePlate: 'XXXXX',
            type: 'any_type'
        };
        const result = sut.validate(request);
        expect(result).toEqual(null);
    });
});
