export const signup = async (username, email, password) => {
    const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers : {
            'Content-type': 'application/JSON'
        },
        body: JSON.stringify({username, email, password})
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || 'An error occurred during signup.';
        throw new Error(errorMessage);
    }

    return data.message;
}