import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GetGoals } from "../goals/functions/getGoals";
import { getProfile } from "./functions/getProfile";
import { useAuth } from "../../auth/authContext";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [goals, setGoals] = useState({});
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const fetchedGoals = await GetGoals(currentUser.uid);
                setGoals(fetchedGoals[0] || {}); // Toma la primera meta si existe

                const fetchedProfile = await getProfile(currentUser.uid);
                setProfile(fetchedProfile || {});
            }
        })();
    }, [currentUser]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    Profile Overview
                </h2>

                {/* Profile Section */}
                <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Personal Information
                    </h3>
                    <div className="space-y-3">
                        <p className="text-gray-600">
                            <strong>Name:</strong> {profile?.name || "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Age:</strong> {profile?.age || "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Weight:</strong>{" "}
                            {profile?.weight
                                ? `${profile.weight} kg`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Height:</strong>{" "}
                            {profile?.height
                                ? `${profile.height} cm`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Body Fat:</strong>{" "}
                            {profile?.bodyFat
                                ? `${profile.bodyFat}%`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Muscle Mass:</strong>{" "}
                            {profile?.muscleMass
                                ? `${profile.muscleMass} kg`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Activity Level:</strong>{" "}
                            {profile?.activityLevel || "Not set"}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/updateProfile")}
                        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Update Profile
                    </button>
                </div>

                {/* Goals Section */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                        Goals
                    </h3>
                    <div className="space-y-3">
                        <p className="text-gray-600">
                            <strong>Goal Type:</strong>{" "}
                            {goals?.goalType || "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Daily Caloric Goal:</strong>{" "}
                            {goals?.dailyCalories
                                ? `${goals.dailyCalories} kcal`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Protein Goal:</strong>{" "}
                            {goals?.proteinGoal
                                ? `${goals.proteinGoal} g`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Carbohydrate Goal:</strong>{" "}
                            {goals?.carbGoal
                                ? `${goals.carbGoal} g`
                                : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Fat Goal:</strong>{" "}
                            {goals?.fatGoal ? `${goals.fatGoal} g` : "Not set"}
                        </p>
                        <p className="text-gray-600">
                            <strong>Target Weight:</strong>{" "}
                            {goals?.targetWeight
                                ? `${goals.targetWeight} kg`
                                : "Not set"}
                        </p>
                    </div>
                    <button
                        onClick={() => navigate("/setGoals")}
                        className="mt-6 w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200"
                    >
                        Set Goals
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
