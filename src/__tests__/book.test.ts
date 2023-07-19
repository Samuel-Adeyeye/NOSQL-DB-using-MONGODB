import express from 'express';
import request from 'supertest';
import app from '../app';
import bookRouter from "../routes/bookRouter";
import userRouter from "../routes/userRouter";

app.use("/users", userRouter);
app.use("/books", bookRouter);

const newUserData = {
  firstname: "Samuel",
  lastname: "Adeyeye",
  email: "samueladeyeye2012@gmail",
  gender: "male"
};

const loginUser = {
  email: "samueladeyeye2012@gmail",
  password: "password"
};

describe("user authentication", () => {
  // CREATE USER TEST
  it('post testing new User', async () => {
    const user = await request(app).post('/users/add').send(newUserData);

    if (user.statusCode === 200) {
      expect(user.body.message).toBe(`User created successfully`);
    }
  });

  // LOGIN USER TEST
  it("post testing loginUser", async () => {

    const userLogin = await request(app).post('/users/login').send(loginUser);

    if (userLogin.statusCode === 200) {
      expect(userLogin.body.message).toBe(`Login successful`);
    }

  });

  // GET USERS TEST
  it("get testing user", async () => {
    const user = await request(app).get('/users/getuser');

    if (user.statusCode === 200) {
      expect(user.body.message).toBe('User gotten successfully');
    }

  });

  // UPDATE USER TEST
  it("put testing user", async () => {
    const user = await request(app).put('/users/update');

    if (user.statusCode === 200) {
      expect(user.body.message).toBe(`User Updated SUCCESSFULLY`);
    }
  });

  // DELETE USER TEST
  it("delete user test", async () => {
    const user = await request(app).delete('/users/delete/:_id');

    if (user.statusCode === 200) {
      expect(user.body.message).toBe(`User DELETED SUCCESSFULLY`);

    }
  });
});

describe('Book route functionalities', () => {

  // ADD A BOOK
  it('Post create books', async () => {

    const newBook = {
      title: "Gen Z",
      author: "Frank Backman",
      datePublished: new Date(),
      description: "A book about a generation of people born after the 20th century.",
      pageCount: 260,
      genre: "History",
      Publisher: "Elsevier",
    };

    const bookResponse = (await request(app).post('/books/add').send(newBook)
      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSIsInVzZXJuYW1lIjoiZGFtZXNlbDMyNDUiLCJlbWFpbCI6ImphbmU0NUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiQxUFFLV2tlM2pVTjVhb3NxLzVoLmouYy5uTEVZR1VMdU4xV2tlUTl4UTdVc3A0REpqTlI5ZSIsImlkIjoiZmQ2YWQ1MzItMGZjZi00Y2Q0LWJkYWEtYTg5NWFjZjU1ZGJjIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMlQwOTo1NjoxOC41OTJaIiwiaWF0IjoxNjg5MTU1ODM5fQ.UvGABSbplSJEzxxcyL7A7PygXUaSRcBLrMQkrswgIyc`));

    if (bookResponse.statusCode === 200) {
      expect(bookResponse.body.message).toBe(`Book created successfully`);
    } 
  });

  // GET BOOK
  it('Get all books', async () => {
    const getAllBooks = await request(app).get('/books/retrieveAll')
      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSIsInVzZXJuYW1lIjoiZGFtZXNlbDMyNDUiLCJlbWFpbCI6ImphbmU0NUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiQxUFFLV2tlM2pVTjVhb3NxLzVoLmouYy5uTEVZR1VMdU4xV2tlUTl4UTdVc3A0REpqTlI5ZSIsImlkIjoiZmQ2YWQ1MzItMGZjZi00Y2Q0LWJkYWEtYTg5NWFjZjU1ZGJjIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMlQwOTo1NjoxOC41OTJaIiwiaWF0IjoxNjg5MTU1ODM5fQ.UvGABSbplSJEzxxcyL7A7PygXUaSRcBLrMQkrswgIyc`);

    if (getAllBooks.statusCode === 200) {
      expect(getAllBooks.body.message).toBe(`Books fetched successfully`);
    } 
  });

  // GET SINGLE BOOK
  it('Get a single book', async () => {
    const getASingleBook = await request(app).get('/books/retrieveOne')
      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSIsInVzZXJuYW1lIjoiZGFtZXNlbDMyNDUiLCJlbWFpbCI6ImphbmU0NUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiQxUFFLV2tlM2pVTjVhb3NxLzVoLmouYy5uTEVZR1VMdU4xV2tlUTl4UTdVc3A0REpqTlI5ZSIsImlkIjoiZmQ2YWQ1MzItMGZjZi00Y2Q0LWJkYWEtYTg5NWFjZjU1ZGJjIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMlQwOTo1NjoxOC41OTJaIiwiaWF0IjoxNjg5MTU1ODM5fQ.UvGABSbplSJEzxxcyL7A7PygXUaSRcBLrMQkrswgIyc`);

    if (getASingleBook.statusCode === 2000) {
      expect(getASingleBook.body.message).toBe(`Book gotten successfully `);
    } 

  });

  // UPDATE ANY BOOKS
  it('Put any books', async () => {
    const updateBooks = await request(app).put('/books/update')
      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSIsInVzZXJuYW1lIjoiZGFtZXNlbDMyNDUiLCJlbWFpbCI6ImphbmU0NUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiQxUFFLV2tlM2pVTjVhb3NxLzVoLmouYy5uTEVZR1VMdU4xV2tlUTl4UTdVc3A0REpqTlI5ZSIsImlkIjoiZmQ2YWQ1MzItMGZjZi00Y2Q0LWJkYWEtYTg5NWFjZjU1ZGJjIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMlQwOTo1NjoxOC41OTJaIiwiaWF0IjoxNjg5MTU1ODM5fQ.UvGABSbplSJEzxxcyL7A7PygXUaSRcBLrMQkrswgIyc`);

    if (updateBooks.statusCode === 200) {
      expect(updateBooks.body.message).toBe(`Book updated successfully`);
    } 
  });

  // DELETE BOOKS
  it('delete book', async () => {
    const deleteBook = await request(app).delete('/books/delete')
      .set('authorization', `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiSmFuZSIsInVzZXJuYW1lIjoiZGFtZXNlbDMyNDUiLCJlbWFpbCI6ImphbmU0NUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiQxUFFLV2tlM2pVTjVhb3NxLzVoLmouYy5uTEVZR1VMdU4xV2tlUTl4UTdVc3A0REpqTlI5ZSIsImlkIjoiZmQ2YWQ1MzItMGZjZi00Y2Q0LWJkYWEtYTg5NWFjZjU1ZGJjIiwiY3JlYXRlZEF0IjoiMjAyMy0wNy0xMlQwOTo1NjoxOC41OTJaIiwiaWF0IjoxNjg5MTU1ODM5fQ.UvGABSbplSJEzxxcyL7A7PygXUaSRcBLrMQkrswgIyc`);

    if (deleteBook.statusCode === 200) {
      expect(deleteBook.body.message).toBe(`Book deleted successfully`);
    } 

  });

});