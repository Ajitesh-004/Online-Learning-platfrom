export const login = async (email, password) => {
    const response = await fetch('http://localhost:3009/api/login', {
        method: 'POST',
        headers: {
            'content-type': 'application/JSON'
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (!response.ok) {
        const errorMessage = data.message || 'An error occurred during login.';
        throw new Error(errorMessage);
    }

    localStorage.setItem('authToken', data.token);
    setUser({ username: data.username, email: data.email });
}