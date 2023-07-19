import express from "express";
import { addBook, getAll, updateBook, deleteBook, getBook } from "../controller/bookController";
import { authenticate } from "../utilities/auth"
import { getPage } from "../controller/bookController"

const router = express.Router();

router.post('/add', /*authenticate ,*/ addBook)
router.get('/retrieveAll', /*authenticate,*/ getAll)
router.get('/retrieveOne', /*authenticate,*/ getBook)
router.put('/update', /*authenticate,*/ updateBook)
router.delete('/delete', /*authenticate,*/ deleteBook)
router.get('/getpage', getPage)

export default router