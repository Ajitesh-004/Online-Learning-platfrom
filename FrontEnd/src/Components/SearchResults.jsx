import { useRecoilState, useRecoilValue } from "recoil";
import { searchQueryAtom } from "../atoms/searchQueryAtom";
import { useCallback, useEffect, useState } from "react";
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';

export const SearchResults = () => {
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const predefinedRoutes = [
        { name: 'Profile', path: '/profile' },
        { name: 'Contact', path: '/contact' },
        { name: 'Home', path: '/' },
    ];

    const fetchResults = useCallback(
        debounce(async (query) => {
            setIsLoading(true);
            setError(null);
            try {
                // Uncomment to fetch data from your API
                // const data = await Search(query); 
                // setResults(data); 
            } catch (error) {
                console.error("Error fetching search results:", error);
                setError("Failed to fetch results. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }, 600),
        []
    );

    useEffect(() => {
        if (searchQuery) {
            fetchResults(searchQuery);
        } else {
            setResults([]); 
        }

        return () => {
            fetchResults.cancel(); 
        };
    }, [searchQuery, fetchResults]);

    const combinedResults = [
        ...results,
        ...predefinedRoutes.filter(route => 
            route.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    ];

    const handleResultClick = () => {
        setSearchQuery(''); 
    };

    return (
        <div className="p-4 rounded-lg bg-white shadow-lg max-w-lg mx-auto mt-4">
            {isLoading ? (
                <p className="text-lg text-blue-500 text-center">Loading...</p>
            ) : error ? (
                <p className="text-red-500 text-center text-lg">{error}</p>
            ) : combinedResults.length > 0 ? (
                combinedResults.map((result, index) => (
                    <Link 
                        to={result.path ? result.path : `/result/${result.id}`} 
                        key={index} 
                        onClick={handleResultClick}
                        className="p-3 border border-gray-300 rounded-md mb-2 hover:bg-blue-100 transition duration-200 block text-left"
                    >
                        {result.name} {/* Display the name */}
                    </Link>
                ))
            ) : (
                <p className="text-gray-500 text-lg text-center">No results found</p>
            )}
        </div>
    );
};
