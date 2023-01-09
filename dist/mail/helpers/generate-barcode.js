"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateBarcode = generateBarcode;
function generateBarcode(value) {
  return `https://barcode.tec-it.com/barcode.ashx?data=${value}&code=Code25IL&eclevel=L`;
}