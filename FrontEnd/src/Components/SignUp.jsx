import { useState } from "react";
import { signup } from "../API_Calls/SignUpAPI";
import { useNavigate, Link } from "react-router-dom"; // Import useNavigate and Link

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const HandleSubmit = async (e) => {
        e.preventDefault(); 
        setIsLoading(true);
        try {
            await signup(username, email, password);
            navigate("/login"); 
        } catch (error) {
            setUsername("");
            setEmail("");
            setPassword("");
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={HandleSubmit} className="bg-gray-100 p-8 rounded-md max-w-md mx-auto shadow-lg hover:bg-gradient-to-r hover:from-[#fdfbfb] hover:to-[#ebedee] transition duration-300 ease-in-out">
            <h2 className="text-3xl font-bold mb-4 text-center text-black">Sign Up</h2>
            
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}

            <div className="mb-6">
                <label className="block text-gray-800 font-semibold">Username*</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold">Email*</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
    
            <div className="mb-6">
                <label className="block text-gray-800 font-semibold">Password*</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
            </div>
    
            <button
                type="submit"
                disabled={isLoading} 
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white p-3 rounded-md hover:from-blue-600 hover:to-pink-600 transition duration-200 font-semibold"
            >
                {isLoading ? "Signing Up..." : "Sign Up"}
            </button>

            <p className="text-center mt-4">Already registered? <Link to="/login" className="text-blue-500 underline">Click here to Login</Link></p>
        </form>
    );    
}
