import express, { Request, Response, NextFunction } from 'express';
import User from '../models/user';
import {
    saltGenerator, passWordGenerator,
    hashPassword,
    tokenGenerator
} from '../utilities/utility';
import { emailHtml, sendmail } from '../utilities/notification';
import bcrypt from 'bcryptjs';
import { userSchema } from '../utilities/validation'



export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { firstname, lastname, email, gender } = req.body;
        const findUser = await User.findOne({ email });

        if (findUser) {
            return res.status(400).json({
                Message: "User Already Exists"
            });
        }

        const salt = await saltGenerator();

        const password = await passWordGenerator(lastname);

        const hashedPassword = await hashPassword(password, salt);

        if (!findUser) {
            const newUser = await User.create({
                firstname,
                lastname,
                email,
                gender,
                password: hashedPassword
            });
            const mainUser = await User.findOne({ email });
            if (mainUser) {
                const html = emailHtml(email, password);
                await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html);
                return res.status(200).json({
                    message: `User created successfully`,
                    mainUser
                });
            }
            return res.status(401).json({
                message: `Unable to create user`
            });

        }

    } catch (error) {
        res.status(500).json({
            Message: "Internal Server Error"

        });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        console.log(user);

        if (!user) {
            return res.status(404).json({
                message: `User does not exist, please register.`
            });
        }

        if (user) {
            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid Password`
                });
            }
            if (validate) {
                const token = await tokenGenerator(`${user._id}`);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email
                });
            }
        }
    } catch (err) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }
};

export const getuser = async (req: Request, res: Response) => {

    try {
        const getalluser = await User.find({}, { password: 0 });
        if (!getalluser) {
            return res.status(400).json("SORRY!! No user found");
        }

        if (getalluser) {
            return res.status(200).json({
                message: "User gotten successfully",
                getalluser
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }

};

export const getoneuser = async (req: Request, res: Response) => {

    try {
        const { _id } = req.params;

        const getuser = await User.find({ _id }, { password: 0 });

        if (!getuser) {
            return res.status(400).json("SORRY!! No user found");
        }

        if (getuser) {
            return res.status(200).json({
                message: "User gotten successfully",
                getuser
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });;
    }

};

export const updateuser = async (req: Request, res: Response) => {

    const { email, firstname, lastname, gender } = req.body;
    try {
        const getalluser = await User.findOneAndUpdate({ email }, { firstname, lastname, gender });

        const getoneuser = await User.findOne({ email });

        if (getalluser) {
            return res.status(200).json({
                message: "User Updated SUCCESSFULLY",
                getoneuser
            });
        }
        if (!getalluser) {
            return res.status(400).json({
                message: "User info cannot be updated. Please use correct email"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }

};

export const deleteuser = async (req: Request, res: Response) => {

    const { _id } = req.params;
    try {
        const getalluser = await User.findOneAndDelete({ _id });

        if (getalluser) {
            return res.status(200).json({
                message: "User DELETED SUCCESSFULLY"
            });
        }
        if (!getalluser) {
            return res.status(400).json({
                message: "User info cannot be deleted. Please use correct email"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error`,
            Error: '/users/login'
        });
    }

};

