"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = exports.sendmail = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
const sendmail = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield exports.transporter.sendMail({
            from: "samueladeyeye2012@gmail.com",
            to,
            subject: "Welcome",
            html
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.sendmail = sendmail;
const emailHtml = (email, password) => {
    const mail = `<h3>Welcome to the Library Platform<h3><br>
    <h5>A new account has been created on your behalf and you have been issued a temporary password.<h5><br>
    <h5>Your current login information is now:</h5><br>
                    <p>Username: ${email}</p><br>
                    <p>Password : ${password}</p><br>
                    <p>(You will need to change your password when you login for the first time)</p><br>
                    <p>Thank You.</p>`;
    return mail;
};
exports.emailHtml = emailHtml;
