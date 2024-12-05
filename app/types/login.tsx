import mongoose from "mongoose";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const loginSchema = new Schema({
    username: {
        type: String,
        required: [true, "Usename is required"]
    }, 
    password: {
        type: String,
        required:[true, "Password is required"] 
    },
    id_usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
});

export const Login = mongoose.model("Login", loginSchema);