import { Profile, ValidateProfile} from "../models/profile.js";

export const getProfile = async (req, res) => {
    const userId = req.params.userId;
    try {
        const profile = await Profile.findOne({userId});
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        } 
        return res.status(200).json(profile);
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}

export const updateProfile = async (req, res) => {
    const userId = req.params.userId;
    const data = ValidateProfile.safeParse(req.body);

    if (!data.success) {
        return res.status(400).json({ message: data.error.errors});
    }

    try {
        const profile = await Profile.findOne({userId});
        if (!profile) {
            const newProfile = new Profile({ userId, ...data.data });
            await newProfile.save();
            return res.status(201).json(newProfile);
        } else {
            Object.assign(profile, data.data);
            await profile.save();
            return res.status(200).json(profile);
        }
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
}