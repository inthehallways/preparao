import mongoose from "mongoose";

export const connectDB = async () => {
    (await mongoose.connect('mongodb+srv://notaisle:JugheadgabbaE@cluster0.fhal4k9.mongodb.net/preparao').then(() => console.log("MongoDB connected")));
}