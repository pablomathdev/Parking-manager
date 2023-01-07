"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateBarcode(value) {
    return `https://barcode.tec-it.com/barcode.ashx?data=${value}&code=Code25IL&eclevel=L`;
}
exports.generateBarcode = generateBarcode;
