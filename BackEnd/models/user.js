import mongoose from "mongoose";
import { z } from 'zod';

const validateUser = z.object({
    username: z.string().min(1,{message: "Require name"}),
    email: z.string().email({message: "Invalid email"}),
    password: z.string().min(6,{message: "Password should have minimum 6 characters"})
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
})

const Users = mongoose.model('User',userSchema);

export default {
    validateUser,
    Users
}