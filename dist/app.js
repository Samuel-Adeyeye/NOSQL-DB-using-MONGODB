"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const bookRouter_1 = __importDefault(require("./routes/bookRouter"));
dotenv_1.default.config();
(0, database_1.dataBase)();
// const db = dataBase();
// middleware
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/users", userRouter_1.default);
app.use("/books", bookRouter_1.default);
app.listen(process.env.PORT || 4000, () => console.log(`Server is running on port ${process.env.PORT || 4000}`));
exports.default = app;
