import { useRecoilState } from "recoil";
import { profileAtom } from "../atoms/profileAtom";
import { userAtom } from "../atoms/userAtom";
import { useState, useEffect } from "react";

export const UserProfile = () => {
    const [profile, setProfile] = useRecoilState(profileAtom);
    const [user] = useRecoilState(userAtom);
    const [error, setError] = useState("");

    return (
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center">
                <img
                    src={profile.profilePicture || 'fallback-image-url.jpg'}
                    alt="User profile"
                    className="h-24 w-24 rounded-full border-2 border-gray-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'fallback-image-url.jpg';
                    }}
                />
                <div className="ml-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{user.username}</h2>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
    );
};
