import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const saltGenerator = async () => {
    return bcrypt.genSalt();
};

export const passWordGenerator = async (lastname: string) => {
    const mixup = lastname += Math.floor(1000 + Math.random() * 90000);
    return mixup;
};

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const tokenGenerator = async (_id: string) => {
    return await jwt.sign({ _id }, `${process.env.APP_SECRET}`, { expiresIn: `1d` });
};