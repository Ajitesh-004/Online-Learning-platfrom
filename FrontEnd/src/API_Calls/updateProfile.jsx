export const updateProfile = async (userId, data) => {
    const response = await fetch(`http://localhost:3000/api/profiles/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`, 
        },
        body: JSON.stringify(data)
    });

    const profile = await response.json();

    if (!response.ok) {
        const errorMessage = profile.message 
            ? Array.isArray(profile.message) 
                ? profile.message.map(err => err.message).join(', ') 
                : profile.message
            : "Something went wrong";
        throw new Error(errorMessage);
    }

    return profile;
}