import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../firebaseConfig";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";

export const Header = () => {
    const { currentUser } = useAuth();
    const handleLogOut = async () => {
        try {
            await signOut(auth);
            Navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <header className="bg-blue-500 text-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                    <a href="/">Macro Counter</a>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-6">
                    <a href="/" className="hover:text-gray-200">
                        Home
                    </a>
                    <a href="/addMeal" className="hover:text-gray-200">
                        Add meal
                    </a>
                    <a href="/setGoals" className="hover:text-gray-200">
                        Set goals
                    </a>
                    <a href="/profile" className="hover:text-gray-200">
                        Profile
                    </a>
                    <a href="/dashboard" className="hover:text-gray-200">
                        Dashboard
                    </a>
                </nav>

                {/* Login Button */}
                {currentUser ? (
                    <div className="hidden md:block">
                        <button
                            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                            onClick={handleLogOut}
                        >
                            Log out
                        </button>
                    </div>
                ) : (
                    <div className="hidden md:block">
                        <button
                            className="bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
                            onClick={() => window.location.replace("/login")}
                        >
                            Log in
                        </button>
                    </div>
                )}

                {/* Mobile Menu Icon */}
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
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
        </header>
    );
};
