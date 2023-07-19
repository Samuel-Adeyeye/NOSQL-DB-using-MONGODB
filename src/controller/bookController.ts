import express, { Request, Response, NextFunction } from 'express';
import Book from '../models/books';
import { bookSchema, bookUpdateSchema } from '../utilities/validation'

interface Book {
    title: string;
    author: string;
    datePublished: string;
    description: string;
    pageCount: number;
    genre: string;
    Publisher: string;
}

//==========================ADD BOOK===========================

export const addBook = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bodyData = req.body;
        const error = bookSchema.safeParse(bodyData);
        if (error.success === false) {
            return res.status(400).send({
                status: "error",
                method: req.method,
                ERROR: error.error.issues.map((a: any) => a.message)
            });
        }
        const { title, author, datePublished, description, pageCount, genre, publisher } = req.body;
       
        const findBook = await Book.findOne({ title });
        if (findBook) {
            return res.status(400).json({
                message: `Book Already Exists`
            });
        }

        if (!findBook) {
            let newBook = await Book.create({
                title,
                author,
                datePublished,
                description,
                pageCount,
                genre,
                publisher
            });
            const mainBook = await Book.findOne({ title });
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

    } catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/create'
        });
    };
};

//==========================GET ALL BOOKS===========================
export const getAll = async(req:Request, res:Response)=>{
    try{
        const page:any = req.query.p || 0
        const bookSent = 5
        const allBooks = await Book.find({}).skip(page * bookSent).limit(bookSent)
        if(!allBooks){
            return res.status(404).json({
                message: `Books not fetched`
            })
        }
        return res.status(200).json({
            message: `Books fetched successfully`,
            allBooks
        })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/getAll'
        })
    }
}

//===================================GET ONE BOOK================================
export const getBook = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { title } = req.body;

        const getoneBook = await Book.find({ title });

        if (!getoneBook) {
            return res.status(400).json("SORRY!! No book found");
        }

        if (getoneBook) {
            return res.status(200).json({
                message: "Book gotten successfully",
                getoneBook
            });
        }
    } catch (error) {
        console.error(error);
    }

};

//==========================UPDATE BOOK===========================
export const updateBook = async(req:Request, res:Response)=>{
    try{
        
        const bodyData = req.body;
    const error = bookUpdateSchema.safeParse(bodyData);
    if (error.success === false) {
        return res.status(400).send({
            status: "error",
            method: req.method,
            ERROR: error.error.issues.map((a: any) => a.message)
        });
    }
        
    const { title, author, datePublished, description, pageCount, genre, publisher } = req.body;
        const book = await Book.findOne({title})

        if(!book){
            return res.status(404).json({
                message: `Book does not exist`
            })
        }
       const updatedBook = await Book.findOneAndUpdate({title}, {author, datePublished, description, pageCount, genre, publisher})

       if(updatedBook){
        return res.status(200).json({
            message: `Book updated successfully`,
            updatedBook
        })
       }
       return res.status(401).json({
        message: `Book not updated`
       })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/update'
        })
    }
}

//==========================DELETE BOOK===========================
export const deleteBook = async(req:Request, res:Response)=>{
    try{
        const { title } = req.body;
        
        const bookToDelete = await Book.findOneAndDelete({title})
        if(!bookToDelete){
            return res.status(500).json({
                message: `Book does not exist`
            })
        }
        const books = await Book.find({})
        return res.status(200).json({
            message: `Book deleted successfully`,
            books
        })
    }catch(err){
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/books/delete'
        })
    }
};

export const getPage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let page = 1;
      if(req.query.page){
        page = parseInt(req.query.page as string)
      if (Number.isNaN(page)) {
       return res.status(400).json({
              message: 'Invalid page number'
      })
    }
      }
      
  
      const pageSize = 5;
      const skip = (page - 1) * pageSize;
  
      const totalCount = await Book.countDocuments();
      const totalPages = Math.ceil(totalCount / pageSize);
  
      const books = await Book.find().skip(skip).limit(pageSize);
  
      return res.status(200).json({
        books,
        currentPage: page,
        totalPages,
      });
    } catch (err) {
      return res.status(500).json({
        error: "Internal Server Error",
      });
    }
  }
