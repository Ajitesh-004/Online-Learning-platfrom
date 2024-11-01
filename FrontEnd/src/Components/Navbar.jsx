import { Link } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import Logo from '../assets/Logo.jpg';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { useCallback, useState } from 'react';
import Profile from '../assets/DefaultProfile.jpg';
import { searchQueryAtom } from "../atoms/searchQueryAtom";
import { FaReact } from 'react-icons/fa';

export const Navbar = () => {
    const [user, setUser] = useRecoilState(userAtom);
    const setSearchQueryAtom = useSetRecoilState(searchQueryAtom);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

    const handleLogout = useCallback(() => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }, [setUser]);

    const handleSearch = (event) => {
        setSearchQueryAtom(event.target.value);
    };

    const MenuItemLink = ({ to, children }) => (
        <li className="bg-gradient-to-r from-[#e0c3fc] to-[#8ec5fc] px-4 py-2 rounded-md text-center transition-all duration-300 hover:bg-gradient-to-r hover:from-[#a1c4fd] hover:to-[#c2e9fb]">
            <Link to={to} className="text-black hover:text-white">{children}</Link>
        </li>
    );

    return (
        <nav className="bg-white p-4 flex justify-between items-center relative">
            {/* Logo and Desktop Menu */}
            <div className="flex items-center space-x-4">
            <FaReact className="text-black h-10 w-auto animate-rotate" />
                <Link to="/">
                    <img
                        src={Logo}
                        alt="Company Logo"
                        className="h-10 w-auto"
                    />
                </Link>
                <div className="hidden md:block">
                    <ul className="flex space-x-4">
                        <MenuItemLink to="/">Home</MenuItemLink>
                        <MenuItemLink to="/about">About</MenuItemLink>
                        <MenuItemLink to="/courses">Courses</MenuItemLink>
                        <MenuItemLink to="/contact">Contact</MenuItemLink>
                    </ul>
                </div>
            </div>

            {/* Search Bar */}
            <div className="flex items-center space-x-2">
                <div className="hidden md:flex items-center bg-gray-200 rounded-full p-2 shadow-inner transition-all duration-200 transform hover:scale-105 hover:shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search Anything"
                        onChange={handleSearch}
                        className="p-1 outline-none bg-transparent w-30 text-black"
                    />
                </div>
                
                {/* Mobile Search Button */}
                <button
                    aria-label="Open search"
                    className="md:hidden text-gray-800 p-2 bg-gray-200 rounded-full focus:outline-none transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                    onClick={() => {
                        setIsMobileSearchOpen(!isMobileSearchOpen);
                        setIsMobileMenuOpen(false);
                    }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

                {/* Mobile Search Overlay */}
                {isMobileSearchOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
                        <div className="bg-white p-4 rounded-lg shadow-lg w-4/5 flex items-center transition-all duration-200 transform hover:scale-105">
                            <input
                                type="text"
                                placeholder="Search Anything"
                                onChange={handleSearch}
                                className="p-2 outline-none bg-gray-100 rounded-full w-full"
                            />
                            <button
                                onClick={() => setIsMobileSearchOpen(false)}
                                className="ml-2 text-gray-800"
                                aria-label="Close search"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* User Profile or Login/Register Links */}
            <div className="flex items-center space-x-4">
                {user ? (
                    <Menu as="div" className="relative">
                        <MenuButton className="rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white" aria-label="User menu">
                            <img
                                src={Profile}
                                alt="User profile"
                                className="h-8 w-8 rounded-full"
                            />
                        </MenuButton>
                        <MenuItems className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="/profile"
                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        Profile
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="/purchasedcourses"
                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        Purchased Courses
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="/assigments"
                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        Assigments
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <Link
                                        to="/certificates"
                                        className={`block px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        Certificates
                                    </Link>
                                )}
                            </MenuItem>
                            <MenuItem>
                                {({ active }) => (
                                    <button
                                        onClick={handleLogout}
                                        className={`block w-full text-left px-4 py-2 text-sm ${active ? 'bg-gray-700 text-white' : 'bg-gray-100'}`}
                                    >
                                        Log Out
                                    </button>
                                )}
                            </MenuItem>
                        </MenuItems>
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

            {/* Hamburger Menu */}
            <button
                className="md:hidden text-gray-800 focus:outline-none"
                onClick={() => {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                    setIsMobileSearchOpen(false);
                }}
                aria-label="Toggle mobile menu"
            >
                {isMobileMenuOpen ? (
                    <span className="text-2xl">&times;</span>
                ) : (
                    <span className="text-2xl">&#9776;</span>
                )}
            </button>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-md z-10">
                    <ul className="flex flex-col space-y-2 p-4">
                        <MenuItemLink to="/">Home</MenuItemLink>
                        <MenuItemLink to="/about">About</MenuItemLink>
                        <MenuItemLink to="/courses">Courses</MenuItemLink>
                        <MenuItemLink to="/contact">Contact</MenuItemLink>
                    </ul>
                </div>
            )}
        </nav>
    );
};
