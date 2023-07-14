"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const router = express_1.default.Router();
router.post('/add', bookController_1.addBook);
router.get('/retrieve', bookController_1.getAll);
router.put('/update', bookController_1.updateBook);
router.delete('/delete', bookController_1.deleteBook);
exports.default = router;
