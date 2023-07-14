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
exports.tokenGenerator = exports.hashPassword = exports.passWordGenerator = exports.saltGenerator = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const saltGenerator = () => __awaiter(void 0, void 0, void 0, function* () {
    return bcryptjs_1.default.genSalt();
});
exports.saltGenerator = saltGenerator;
const passWordGenerator = (lastname) => __awaiter(void 0, void 0, void 0, function* () {
    const mixup = lastname += Math.floor(1000 + Math.random() * 90000);
    return mixup;
});
exports.passWordGenerator = passWordGenerator;
const hashPassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.hash(password, salt);
});
exports.hashPassword = hashPassword;
const tokenGenerator = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield jsonwebtoken_1.default.sign({ _id }, `${process.env.APP_SECRET}`, { expiresIn: `1d` });
});
exports.tokenGenerator = tokenGenerator;
