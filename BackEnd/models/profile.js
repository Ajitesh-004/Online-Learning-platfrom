import mongoose from "mongoose";
import { z } from "zod";

const ValidateProfile = z.object({
    PhNumber: z.string("Phone number is required"),
    YearSem: z.string("Year/Semester is required"),
    Specialization: z.string("Specialization is required"),
    College: z.string("College is required"),
    Address: z.string().optional(), 
    PinCode: z.string().optional()
});

const ProfileSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    PhNumber: { type: String, required: true },
    YearSem: { type: String, required: true },
    Specialization: { type: String, required: true },
    College: { type: String, required: true },
    Address: { type: String },
    PinCode: { type: String, required: true },
}, { timestamps: true });

const Profile = mongoose.model('Profile', ProfileSchema);

export { Profile, ValidateProfile };
