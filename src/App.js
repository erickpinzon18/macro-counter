import React, { useEffect, useState } from "react";
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
import { ViewDashboard } from "./pages/dashboard/viewDashboard";
import { getToken, onMessage } from "firebase/messaging";
import { messaging } from "./firebaseConfig";
import { saveFCMToken } from "./functions/saveFCMToken";
import { useAuth } from "./auth/authContext";

const requestPermission = async (currentUser) => {
    try {
        console.log("Requesting permission...");
        const registration = await navigator.serviceWorker.ready;
        console.log("Service Worker ready.");
        const token = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_FB_VAPID_KEY,
            serviceWorkerRegistration: registration,
        });
        if (token) {
            console.log("FCM Token obtained:", token);
            await saveFCMToken(token, currentUser.uid);
        } else {
            console.log(
                "No registration token available. Request permission to generate one."
            );
        }
    } catch (error) {
        if (error.code === "messaging/permission-blocked") {
            alert(
                "Notifications are blocked. Please enable them in your browser settings."
            );
        } else {
            console.error("An error occurred while retrieving token. ", error);
        }
    }
};

function App() {
    const { currentUser } = useAuth();
    const [permissionRequested, setPermissionRequested] = useState(false);

    useEffect(() => {
        if (!permissionRequested && currentUser) {
            console.log("Requesting notification permission...");
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    console.log("Notification permission granted.");
                    setPermissionRequested(true);
                } else if (permission === "denied") {
                    alert(
                        "Notifications are blocked. Please enable them in your browser settings."
                    );
                }
            });
        }

        if (permissionRequested && currentUser) {
            console.log("Requesting FCM token...");
            requestPermission(currentUser);

            onMessage(messaging, (payload) => {
                console.log("Message received. ", payload);
                // Maneja la notificación en primer plano
            });
        }
    }, [permissionRequested, currentUser]);

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
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <ViewDashboard />
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
