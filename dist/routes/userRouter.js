"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
router.post("/add", userController_1.createUser);
router.post("/login", userController_1.loginUser);
router.get("/get", userController_1.getuser);
router.get("/singleuser/:_id", userController_1.getoneuser);
router.put("/update", userController_1.updateuser);
router.delete("/delete/:_id", userController_1.deleteuser);
exports.default = router;
