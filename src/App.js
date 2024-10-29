import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import ProtectedRoute from "./routes/protectedRoute";
import "./index.css";
import { Header } from "./components/header";
import { AddMeal } from "./pages/meals/addMeal";
import { SetGoals } from "./pages/goals/setGoals";
import { UpdateProfile } from "./pages/profile/updateProfile";
import ProfilePage from "./pages/profile/viewProfile";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="p-5">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/about"
                        element={
                            <ProtectedRoute>
                                <About />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/addMeal"
                        element={
                            <ProtectedRoute>
                                <AddMeal />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/setGoals"
                        element={
                            <ProtectedRoute>
                                <SetGoals />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/updateProfile"
                        element={
                            <ProtectedRoute>
                                <UpdateProfile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
