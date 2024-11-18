import { signOut } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export const Header = () => {
    const { currentUser } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/addMeal", label: "Add meal" },
        { href: "/setGoals", label: "Set goals" },
        { href: "/profile", label: "Profile" },
        { href: "/dashboard", label: "Dashboard" },
    ];

    return (
        <header className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <a href="/">Macro Counter</a>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="hover:text-gray-200">
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Login Button */}
                <div className="hidden md:block">
                    {currentUser ? (
                        <button
                            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                            onClick={handleLogOut}
                        >
                            Log out
                        </button>
                    ) : (
                        <button
                            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                            onClick={() => navigate("/login")}
                        >
                            Log in
                        </button>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button
                        className="text-white focus:outline-none"
                        onClick={toggleMobileMenu}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-blue-500 text-white p-4">
                    <nav className="space-y-4">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="block hover:text-gray-200">
                                {link.label}
                            </a>
                        ))}
                        {currentUser ? (
                            <button
                                className="w-full bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                                onClick={handleLogOut}
                            >
                                Log out
                            </button>
                        ) : (
                            <button
                                className="w-full bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                                onClick={() => navigate("/login")}
                            >
                                Log in
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};