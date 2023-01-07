"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./dotenv");
const app_1 = __importDefault(require("./app"));
app_1.default.listen(process.env.PORT, () => {
    console.log(`running on port ${process.env.PORT}`);
});
