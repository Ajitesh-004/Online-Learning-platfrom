import mongoose from "mongoose";
import { z } from 'zod';

export const validateUser = z.object({
    username: z.string().min(1, { message: "Require name" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password should have minimum 6 characters" })
});

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Export the User model as default
const Users = mongoose.model('User', userSchema);
export default Users; // Export the Users model as default
