import express,{Request, Response, NextFunction} from "express";
import logger  from "morgan"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { dataBase } from "./config/database"
import userRouter from "./routes/userRouter"
import bookRouter from "./routes/bookRouter"
dotenv.config()
  const db = dataBase()

const app = express()
app.use(logger("dev"))
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use("/users", userRouter)
app.use("/books", bookRouter)

 

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

export default app