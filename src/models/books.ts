import mongoose, { Schema } from "mongoose";

export interface IBook {
    title: string;
    author: string;
    datePublished: string;
    description: string;
    pageCount: number;
    genre: string;
    Publisher: string;
}

const bookSchema = new Schema({
    title: {
        type: String,
        require: [true, `This input is required`]
    },
    author: {
        type: String,
        require: [true, `This inpus is required`]
    },
    datePublished: {
        type: String,
        required: [true, `This inpus is required`]
    },
    description: {
        type: String,
        require: [true, `This inpus is required`]
    },
    pageCount: {
        type: Number,
        require: [false]
    },
    genre: {
        type: String,
        required: [false]
    },
    Publisher: {
        type: String,
        required: [false]
    },

},
    {  
    timestamps: true
    }
);

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book