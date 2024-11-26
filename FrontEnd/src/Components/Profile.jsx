import { useRecoilState, useRecoilValue } from "recoil";
import { profileAtom } from "../atoms/profileAtom";
import { userAtom } from "../atoms/userAtom";
import { useState, useEffect } from "react";
import profilePic from "../assets/DefaultProfile.jpg";
import { getProfile } from "../API_Calls/getProfile";
import { updateProfile } from "../API_Calls/updateProfile";

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
    <div className="max-w-2xl mx-auto bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-lg p-6 sm:p-8 space-y-6 mt-8">
      {/* Header Section */}
      <div className="flex items-center">
        <img
          src={profilePic}
          alt="User profile"
          className="h-24 w-24 rounded-full border-4 border-blue-300 shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "fallback-image-url.jpg"; // Provide a valid fallback image URL
          }}
        />
        <div className="ml-6">
          <h2 className="text-3xl font-bold text-gray-800">{user.username}</h2>
          <p className="text-gray-600 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
          <input
            type="text"
            value={profile?.PhNumber || ""}
            onChange={(e) => setProfile({ ...profile, PhNumber: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Year/Semester</label>
          <input
            type="text"
            value={profile?.YearSem || ""}
            onChange={(e) => setProfile({ ...profile, YearSem: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Specialization</label>
          <input
            type="text"
            value={profile?.Specialization || ""}
            onChange={(e) => setProfile({ ...profile, Specialization: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">College</label>
          <input
            type="text"
            value={profile?.College || ""}
            onChange={(e) => setProfile({ ...profile, College: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Address</label>
          <input
            type="text"
            value={profile?.Address || ""}
            onChange={(e) => setProfile({ ...profile, Address: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">Pin Code</label>
          <input
            type="text"
            value={profile?.PinCode || ""}
            onChange={(e) => setProfile({ ...profile, PinCode: e.target.value })}
            className="border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Feedback Messages */}
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {success && <p className="text-green-500 font-medium">{success}</p>}

      {/* Update Button */}
      <button
        onClick={handleProfileUpdate}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg"
      >
        Update Profile
      </button>
    </div>
  );
};
