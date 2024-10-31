export const Search = async (query) => {
    if (!query) {
        return [];
    }

    try {
        const response = await fetch(`http://localhost:3000/api/search/${query}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = response.json();
        return data.results;
    } catch(error) {
        console.error('Error fetching search results:', error);
        return [];
    }
}