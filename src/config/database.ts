import mongoose from "mongoose";
export const dataBase = async () => {
    try {
        const connectDb = mongoose.connect(`mongodb+srv://samueladeyeye2012:Ei4zXZMRuSA4mokc@cluster0.hzsluef.mongodb.net/registry`) 
        console.log("MongoDB connected successfully")
    } catch (error) {
       console.log(error) 
    }
}