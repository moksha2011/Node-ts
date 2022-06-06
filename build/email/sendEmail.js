"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = __importStar(require("nodemailer"));
const sendEmail = async (authorEmail, token) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.USEREMAILID,
            pass: process.env.USERPASSWORD,
        },
    });
    const link = `http://localhost:30301/v1/forgotpassword/basic/confirm/${token}`;
    const info = await transporter.sendMail({
        from: '"Azi!!!!" <moksha.shah@azilen.com>',
        to: authorEmail,
        subject: 'Lms NestAssignment',
        text: 'lms buddy',
        html: `<body><b>You have registered in our app</b>
    <p>
    Please confirm your email here <a href="${link}">Please confirm email</a></p></body> "`,
    });
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    return Promise.resolve('sucessfull');
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map