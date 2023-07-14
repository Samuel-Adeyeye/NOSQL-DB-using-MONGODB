import mongoose, { Schema } from "mongoose";

interface IUser {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    gender: string,
    password: string
}

const userSchema = new Schema({
    firstname: {
        type: String,
        require: [true, "please enter your first name"]
    },
    lastname: {
        type: String,
        require: [true, "please enter your last name"]
    },
    email: {
        type: String,
        require: [true, "please enter your email"]
    },
    gender: {
        type: String,
        require: [true, "please select your gender"]
    },
    password: {
        type: String,
        require: [false]
    },
},
    {
        timestamps: true
    }
);

const User = mongoose.model<IUser>("Users", userSchema);
export default User;
