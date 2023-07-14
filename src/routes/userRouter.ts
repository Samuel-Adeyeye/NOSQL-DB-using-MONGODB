import express from "express";
import { createUser, loginUser, getuser, getoneuser, updateuser, deleteuser } from "../controller/userController";

const router = express.Router();

router.post("/add", createUser);

router.post("/login", loginUser)

router.get("/get", getuser);

router.get("/singleuser/:_id", getoneuser);

router.put("/update", updateuser);

router.delete("/delete/:_id", deleteuser);

export default router;