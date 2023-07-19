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
exports.getPage = exports.deleteBook = exports.updateBook = exports.getBook = exports.getAll = exports.addBook = void 0;
const books_1 = __importDefault(require("../models/books"));
const validation_1 = require("../utilities/validation");
//==========================ADD BOOK===========================
const addBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const error = validation_1.bookSchema.safeParse(bodyData);
        if (error.success === false) {
            return res.status(400).send({
                status: "error",
                method: req.method,
                ERROR: error.error.issues.map((a) => a.message)
            });
        }
        const { title, author, datePublished, description, pageCount, genre, publisher } = req.body;
        const findBook = yield books_1.default.findOne({ title });
        if (findBook) {
            return res.status(400).json({
                message: `Book Already Exists`
            });
        }
        if (!findBook) {
            let newBook = yield books_1.default.create({
                title,
                author,
                datePublished,
                description,
                pageCount,
                genre,
                publisher
            });
            const mainBook = yield books_1.default.findOne({ title });
            if (mainBook) {
                return res.status(200).json({
                    message: `Book created successfully`,
                    mainBook
                });
            }
            return res.status(401).json({
                message: `Unable to Create Book`
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/create'
        });
    }
    ;
});
exports.addBook = addBook;
//==========================GET ALL BOOKS===========================
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.p || 0;
        const bookSent = 5;
        const allBooks = yield books_1.default.find({}).skip(page * bookSent).limit(bookSent);
        if (!allBooks) {
            return res.status(404).json({
                message: `Books not fetched`
            });
        }
        return res.status(200).json({
            message: `Books fetched successfully`,
            allBooks
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/getAll'
        });
    }
});
exports.getAll = getAll;
//===================================GET ONE BOOK================================
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const getoneBook = yield books_1.default.find({ title });
        if (!getoneBook) {
            return res.status(400).json("SORRY!! No book found");
        }
        if (getoneBook) {
            return res.status(200).json({
                message: "Book gotten successfully",
                getoneBook
            });
        }
    }
    catch (error) {
        console.error(error);
    }
});
exports.getBook = getBook;
//==========================UPDATE BOOK===========================
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bodyData = req.body;
        const error = validation_1.bookUpdateSchema.safeParse(bodyData);
        if (error.success === false) {
            return res.status(400).send({
                status: "error",
                method: req.method,
                ERROR: error.error.issues.map((a) => a.message)
            });
        }
        const { title, author, datePublished, description, pageCount, genre, publisher } = req.body;
        const book = yield books_1.default.findOne({ title });
        if (!book) {
            return res.status(404).json({
                message: `Book does not exist`
            });
        }
        const updatedBook = yield books_1.default.findOneAndUpdate({ title }, { author, datePublished, description, pageCount, genre, publisher });
        if (updatedBook) {
            return res.status(200).json({
                message: `Book updated successfully`,
                updatedBook
            });
        }
        return res.status(401).json({
            message: `Book not updated`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/update'
        });
    }
});
exports.updateBook = updateBook;
//==========================DELETE BOOK===========================
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const bookToDelete = yield books_1.default.findOneAndDelete({ title });
        if (!bookToDelete) {
            return res.status(500).json({
                message: `Book does not exist`
            });
        }
        const books = yield books_1.default.find({});
        return res.status(200).json({
            message: `Book deleted successfully`,
            books
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/delete'
        });
    }
});
exports.deleteBook = deleteBook;
const getPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let page = 1;
        if (req.query.page) {
            page = parseInt(req.query.page);
            if (Number.isNaN(page)) {
                return res.status(400).json({
                    message: 'Invalid page number'
                });
            }
        }
        const pageSize = 5;
        const skip = (page - 1) * pageSize;
        const totalCount = yield books_1.default.countDocuments();
        const totalPages = Math.ceil(totalCount / pageSize);
        const books = yield books_1.default.find().skip(skip).limit(pageSize);
        return res.status(200).json({
            books,
            currentPage: page,
            totalPages,
        });
    }
    catch (err) {
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
});
exports.getPage = getPage;
