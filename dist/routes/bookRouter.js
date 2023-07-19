"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../controller/bookController");
const bookController_2 = require("../controller/bookController");
const router = express_1.default.Router();
router.post('/add', /*authenticate ,*/ bookController_1.addBook);
router.get('/retrieveAll', /*authenticate,*/ bookController_1.getAll);
router.get('/retrieveOne', /*authenticate,*/ bookController_1.getBook);
router.put('/update', /*authenticate,*/ bookController_1.updateBook);
router.delete('/delete', /*authenticate,*/ bookController_1.deleteBook);
router.get('/getpage', bookController_2.getPage);
exports.default = router;
