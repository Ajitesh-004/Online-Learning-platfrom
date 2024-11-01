// Footer.js
import React from "react";
import Logo from '../assets/Logo.jpg';
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return ( 
    <footer className="bg-gray-100 text-black py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-around">
        
        {/* Logo Section */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <Link to="/">
            <img src={Logo} alt="Company Logo" className="h-10 w-auto" />
          </Link>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-6 mt-4">
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaFacebook className="text-2xl text-gray-400 hover:text-blue-500 transition" />
            </a>
            <a href="https://www.linkedin.com/company/it-defined/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-2xl text-gray-400 hover:text-blue-500 transition" />
            </a>
            <a href="https://www.instagram.com/it.defined/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram className="text-2xl text-gray-400 hover:text-blue-500 transition" />
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="text-center mb-6 md:mb-0">
          <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
          <p className="mb-1">
            <span className="font-semibold">Phone:</span> +91 6363730986 | +91 9535440402
          </p>
          <p className="mb-1">
            <span className="font-semibold">Email:</span> 
            <br />
            <a href="mailto:info@itdefined.org" className="text-blue-400 hover:text-blue-300 transition">info@itdefined.org</a>{" | "}
            <a href="mailto:support@itdefined.org" className="text-blue-400 hover:text-blue-300 transition">support@itdefined.org</a>
          </p>
          <p>
            <span className="font-semibold">Location:</span> Whitefield, Bangalore, Karnataka 560067
          </p>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 space-y-3 mt-6">
        <p className="text-sm">&copy; {new Date().getFullYear()} IT DEFINED. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
