import request from 'supertest';
import express from 'express';
import bookRouter from "../routes/bookRouter";
import userRouter from "../routes/userRouter";

const app = express();

app.use("/users", userRouter)
app.use("/books", bookRouter);

describe('Users Testing', () => {

    test('should specify json in the content type header', async() => {

      const response = await request(app).post('/users/create').send({

        firstname: "firstname",

        lastname: "lastname",

        email: "email"

      })

      expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))

      

    })



    test('should respond with a 500 status code', async() => {

      const response = await request(app).post('/users/create').send({

        firstname: "firstname",

        lastname: "lastname",

        email: "email"

      })

      expect(response.statusCode).toBe(500)      

    }) 

})





describe("POST request testing", () => {

  test('should specify json in the content type header', async () => {

    const response = await request(app).post('/books/create').send({

      title: "title",

      author: "author",

      datePublished: "datePublished",

      description: "description",

      pageCount: "pageCount",

      genre: "genre",

      publisher: "publisher"       

    })

    expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))

  })

})





  describe ("DELETE request testing", () => {

  test('DELETE/books/delete - failure when user is not authorized', async()=> {

    const response = await request(app).delete('/books/delete').send({

      title: "Wonder Woman"

    })

    expect(response.statusCode).toBe(401)

  })

  })
