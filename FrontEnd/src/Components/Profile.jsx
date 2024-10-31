import { useRecoilState, useRecoilValue } from "recoil";
import { profileAtom } from "../atoms/profileAtom";
import { userAtom } from "../atoms/userAtom";
import { useState, useEffect } from "react";
import profilePic from '../assets/DefaultProfile.jpg';
import { getProfile } from '../API_Calls/getProfile';
import { updateProfile } from '../API_Calls/updateProfile';

export const UserProfile = () => {
    const [profile, setProfile] = useRecoilState(profileAtom);
    const user = useRecoilValue(userAtom);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const userId = user.userId;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!userId) throw new Error("User ID is not available");
                const profileData = await getProfile(userId);
                setProfile(profileData);
                setError("");
            } catch (err) {
                setError("Failed to load profile.");
            }
        };

        if (userId) fetchProfile();
    }, [userId, setProfile]);

    const handleProfileUpdate = async () => {
        try {
            if (!userId) throw new Error("User ID is missing for update");
            const updatedProfile = await updateProfile(userId, profile);
            setProfile(updatedProfile);
            setSuccess("Profile updated successfully!");
            setError("");
        } catch (err) {
            setError(err.message || "Failed to update profile.");
            setSuccess("");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8 space-y-4 mt-6"> {/* Container with padding and spacing */}
            <div className="flex items-center">
                <img
                    src={profilePic}
                    alt="User profile"
                    className="h-24 w-24 rounded-full border-2 border-gray-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'fallback-image-url.jpg'; // Provide a valid fallback image URL
                    }}
                />
                <div className="ml-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
            </div>

            <div className="space-y-2"> {/* Vertical spacing for input fields */}
                <label className="block text-gray-700">Phone Number:</label>
                <input
                    type="text"
                    value={profile?.PhNumber || ''}
                    onChange={(e) => setProfile({ ...profile, PhNumber: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700">Year/Semester:</label>
                <input
                    type="text"
                    value={profile?.YearSem || ''}
                    onChange={(e) => setProfile({ ...profile, YearSem: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700">Specialization:</label>
                <input
                    type="text"
                    value={profile?.Specialization || ''}
                    onChange={(e) => setProfile({ ...profile, Specialization: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700">College:</label>
                <input
                    type="text"
                    value={profile?.College || ''}
                    onChange={(e) => setProfile({ ...profile, College: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700">Address:</label>
                <input
                    type="text"
                    value={profile?.Address || ''}
                    onChange={(e) => setProfile({ ...profile, Address: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />

                <label className="block text-gray-700">Pin Code:</label>
                <input
                    type="text"
                    value={profile?.PinCode || ''}
                    onChange={(e) => setProfile({ ...profile, PinCode: e.target.value })}
                    className="border rounded p-2 w-full focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}

            <button
                onClick={handleProfileUpdate}
                className="mt-4 bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 transition duration-200 cursor-pointer"
            >
                Update Profile
            </button>
        </div>
    );
};
