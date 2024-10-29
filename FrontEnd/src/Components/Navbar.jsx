import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import Logo from '../assets/Logo.jpg';
import { Menu } from '@headlessui/react';
import { useCallback } from 'react';
import Profile from '../assets/DefaultProfile.jpg';

export const Navbar = () => {
    const [user, setUser] = useRecoilState(userAtom);

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, [setUser]);

    const MenuItemLink = ({ to, children }) => (
        <li className="bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] px-4 py-2 rounded-md text-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#a1c4fd] hover:to-[#c2e9fb]">
            <Link to={to} className="text-black hover:text-white">{children}</Link>
        </li>
    );

    return (
        <nav className="bg-white p-4 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Company Logo"
                        className="h-10 w-auto"
                    />
                </Link>
                <ul className="flex space-x-4">
                    <MenuItemLink to="/">Home</MenuItemLink>
                    <MenuItemLink to="/about">About</MenuItemLink>
                    <MenuItemLink to="/courses">Courses</MenuItemLink>
                    <MenuItemLink to="/contact">Contact</MenuItemLink>
                </ul>
            </div>

            <div className="flex items-center space-x-4">
                {user ? (
                    <Menu as="div" className="relative">
                        <Menu.Button className="rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="User menu">
                            <img
                                src={Profile} 
                                alt="User profile"
                                className="h-8 w-8 rounded-full"
                                onError={(e) => {
                                    e.target.onerror = null; 
                                    e.target.src = 'fallback-image-url.jpg';
                                }}
                            />
                        </Menu.Button>
                        <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <Menu.Item>
                                {({ active }) => (
                                    <Link to="/profile" className={`block px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
                                        Profile
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button onClick={handleLogout} className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}>
                                        Log Out
                                    </button>
                                )}
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                ) : (
                    <>
                        <div className="bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] px-4 py-2 rounded-md text-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#a1c4fd] hover:to-[#c2e9fb]">
                            <Link to="/signup" className="text-black hover:text-white">Register</Link>
                        </div>
                        <div className="bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] px-4 py-2 rounded-md text-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#a1c4fd] hover:to-[#c2e9fb]">
                            <Link to="/login" className="text-black hover:text-white">Login</Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};
