"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
exports.default = {
    businessInput: joi_1.default.object().keys({
        businessName: joi_1.default.string()
            .required()
            .min(5)
            .max(50)
            .message('length of name Should be between 5 to 50'),
        businessDescription: joi_1.default.string()
            .required()
            .min(5)
            .max(150)
            .message('length of name Should be between 5 to 50 '),
    }),
};
//# sourceMappingURL=schema.js.map