import Users, { validateUser } from '../models/User.js'; 
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const SignUp = async (req, res) => {
    const validationResult = validateUser.safeParse(req.body);

    if (!validationResult.success) {
        return res.status(400).json({ message: validationResult.error.errors });
    }

    const { username, email, password } = validationResult.data;

    try {
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new Users({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "New user created" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal server error: ${error}` });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No user with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY);
        return res.status(200).json({ username: user.username, email: user.email, token });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal server error: ${error}` });
    }
};