import express from "express";
import { addBook, getAll, updateBook, deleteBook } from "../controller/bookController";

const router = express.Router();

router.post('/add', addBook)
router.get('/retrieve', getAll)
router.put('/update', updateBook)
router.delete('/delete', deleteBook)

export default router