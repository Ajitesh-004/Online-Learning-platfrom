export const getProfile = async (userId) => {
    const response = await fetch(`http://localhost:3000/api/profiles/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('Token')}`, 
        },
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message;
        throw new Error(errorMessage);
    }

    return data; 
};
