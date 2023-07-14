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
exports.deleteuser = exports.updateuser = exports.getoneuser = exports.getuser = exports.loginUser = exports.createUser = void 0;
const user_1 = __importDefault(require("../models/user"));
const utility_1 = require("../utilities/utility");
const notification_1 = require("../utilities/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, email, gender } = req.body;
        const findUser = yield user_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                Message: "User Already Exists"
            });
        }
        const salt = yield (0, utility_1.saltGenerator)();
        const password = yield (0, utility_1.passWordGenerator)(lastname);
        const hashedPassword = yield (0, utility_1.hashPassword)(password, salt);
        if (!findUser) {
            const newUser = yield user_1.default.create({
                firstname,
                lastname,
                email,
                gender,
                password: hashedPassword
            });
            const mainUser = yield user_1.default.findOne({ email });
            if (mainUser) {
                const html = (0, notification_1.emailHtml)(email, password);
                yield (0, notification_1.sendmail)(`${process.env.GMAIL_USER}`, email, "Welcome", html);
                return res.status(200).json({
                    message: `User created successfully`,
                });
            }
            return res.status(401).json({
                message: `Unable to create user`
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Message: "Internal Server Error"
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield user_1.default.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({
                message: `User does not exist, please register.`
            });
        }
        if (user) {
            const validate = yield bcryptjs_1.default.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid Password`
                });
            }
            if (validate) {
                const token = yield (0, utility_1.tokenGenerator)(`${user._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
});
exports.loginUser = loginUser;
const getuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getalluser = yield user_1.default.find({}, { password: 0 });
        if (!getalluser) {
            return res.status(400).json("SORRY!! No user found");
        }
        if (getalluser) {
            return res.status(200).json({
                message: "User gotten successfully",
                getalluser
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getuser = getuser;
const getoneuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.params;
        const getuser = yield user_1.default.find({ _id }, { password: 0 });
        if (!getuser) {
            return res.status(400).json("SORRY!! No user found");
        }
        if (getuser) {
            return res.status(200).json({
                message: "User gotten successfully",
                getuser
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getoneuser = getoneuser;
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstname, lastname, gender } = req.body;
    try {
        const getalluser = yield user_1.default.findOneAndUpdate({ email }, { firstname, lastname, gender });
        const getoneuser = yield user_1.default.findOne({ email });
        if (getalluser) {
            return res.status(200).json({
                message: "User Updated SUCCESSFULLY",
                getoneuser
            });
        }
        if (!getalluser) {
            return res.status(400).json({
                message: "User info cannot be updated. Please use correct email"
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.updateuser = updateuser;
const deleteuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    try {
        const getalluser = yield user_1.default.findOneAndDelete({ _id });
        if (getalluser) {
            return res.status(200).json({
                message: "User DELETED SUCCESSFULLY"
            });
        }
        if (!getalluser) {
            return res.status(400).json({
                message: "User info cannot be deleted. Please use correct email"
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.deleteuser = deleteuser;
