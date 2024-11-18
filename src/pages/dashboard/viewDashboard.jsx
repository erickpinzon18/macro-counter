import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import { getMeals } from "../meals/functions/getMeals";
import { LineChart } from "@mui/x-charts";
import { GetGoals } from "../goals/functions/getGoals";
import { getProfile } from "../profile/functions/getProfile";
import { Box } from "@mui/material";

export const ViewDashboard = () => {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const [loadingMeals, setLoadingMeals] = useState(true);

    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFats, setTotalFats] = useState(0);
    const [proteinData, setProteinData] = useState([]);
    const [carbData, setCarbData] = useState([]);
    const [fatData, setFatData] = useState([]);
    const [lastData, setLastData] = useState([]);
    const [userProfile, setUserProfile] = useState({});
    const [userGoals, setUserGoals] = useState({});

    useEffect(() => {
        const fetchMeals = async () => {
            if (currentUser) {
                const userMeals = await getMeals(currentUser.uid);

                const groupedMeals = userMeals.reduce((acc, meal) => {
                    const date = meal.createdAt
                        .toDate()
                        .toISOString()
                        .split("T")[0];
                    if (date) {
                        if (!acc[date]) {
                            acc[date] = { protein: 0, carbs: 0, fats: 0 };
                        }
                        acc[date].protein += meal.protein;
                        acc[date].carbs += meal.carbs;
                        acc[date].fats += meal.fats;
                    }
                    return acc;
                }, {});

                const chartData = Object.keys(groupedMeals).map((date) => ({
                    date,
                    protein: groupedMeals[date].protein,
                    carbs: groupedMeals[date].carbs,
                    fats: groupedMeals[date].fats,
                }));

                setLastData(chartData);

                setTotalProtein(
                    userMeals?.reduce((acc, meal) => acc + meal?.protein, 0)
                );
                setTotalCarbs(
                    userMeals?.reduce((acc, meal) => acc + meal?.carbs, 0)
                );
                setTotalFats(
                    userMeals?.reduce((acc, meal) => acc + meal?.fats, 0)
                );
                setProteinData(chartData.map((data) => data.protein));
                setCarbData(chartData.map((data) => data.carbs));
                setFatData(chartData.map((data) => data.fats));
                setLoadingMeals(false);
            }
        };

        const fetchGoals = async () => {
            if (currentUser) {
                const userGoals = await GetGoals(currentUser.uid);
                setUserGoals(userGoals[0]);
            }
        };

        const fetchProfile = async () => {
            if (currentUser) {
                const user = await getProfile(currentUser.uid);
                setUserProfile(user);
            }
        };

        fetchMeals();
        fetchGoals();
        fetchProfile();
    }, [currentUser]);

    const xLabels = lastData.map((data) => data.date);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
                    Profile Overview
                </h2>
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-blue-600 break-words">
                        Welcome, {userData?.email || userProfile.name}!
                    </h1>
                    <p className="text-gray-500">
                        Member since:{" "}
                        {userData?.createdAt.toDate().toLocaleDateString() ||
                            "N/A"}
                    </p>
                </header>

                <div className="flex flex-col md:flex-row">
                    {/* User Profile */}
                    <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex-auto md:mr-3">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">
                            User Profile
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <p className="text-gray-600">
                                <strong>Name:</strong> {userProfile.name}
                            </p>
                            <p className="text-gray-600">
                                <strong>Age:</strong> {userProfile.age}
                            </p>
                            <p className="text-gray-600">
                                <strong>Height:</strong> {userProfile.height} cm
                            </p>
                            <p className="text-gray-600">
                                <strong>Weight:</strong> {userProfile.weight} kg
                            </p>
                            <p className="text-gray-600">
                                <strong>Body Fat:</strong> {userProfile.bodyFat}
                                %
                            </p>
                            <p className="text-gray-600">
                                <strong>Muscle Mass:</strong>{" "}
                                {userProfile.muscleMass}%
                            </p>
                            <p className="text-gray-600">
                                <strong>Activity Level:</strong>{" "}
                                {userProfile.activityLevel}
                            </p>
                        </div>
                    </section>

                    {/* Line Chart */}
                    <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex-auto md:ml-3">
                        <Box flexGrow={1}>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Nutrient Intake Chart
                            </h2>
                            <LineChart
                                height={250}
                                series={[
                                    { data: proteinData, label: "Protein" },
                                    { data: carbData, label: "Carbs" },
                                    { data: fatData, label: "Fats" },
                                ]}
                                xAxis={[{ scaleType: "point", data: xLabels }]}
                                className="mx-auto"
                            />
                        </Box>
                    </section>
                </div>

                {/* User Goals */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Goals
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Protein
                            </h3>
                            <p className="text-2xl font-bold text-blue-500">
                                {userGoals.proteinGoal}g
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Carbs
                            </h3>
                            <p className="text-2xl font-bold text-green-500">
                                {userGoals.carbGoal}g
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Fats
                            </h3>
                            <p className="text-2xl font-bold text-red-500">
                                {userGoals.fatGoal}g
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Calories
                            </h3>
                            <p className="text-2xl font-bold text-purple-500">
                                {userGoals.dailyCalories} kcal
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Target Weight
                            </h3>
                            <p className="text-2xl font-bold text-yellow-500">
                                {userGoals.targetWeight} kg
                            </p>
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-medium text-gray-800">
                                Goal Type
                            </h3>
                            <p className="text-2xl font-bold text-orange-500">
                                {userGoals.goalType}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Meal Summary */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Daily Summary
                    </h2>
                    {loadingMeals ? (
                        <div>Loading meals...</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Proteins
                                </h3>
                                <p className="text-2xl font-bold text-blue-500">
                                    {totalProtein}g
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Carbs
                                </h3>
                                <p className="text-2xl font-bold text-green-500">
                                    {totalCarbs}g
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Fats
                                </h3>
                                <p className="text-2xl font-bold text-red-500">
                                    {totalFats}g
                                </p>
                            </div>
                        </div>
                    )}
                </section>

                {/* Button to Add Meal */}
                <button
                    onClick={() => navigate("/addMeal")}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition"
                >
                    Add Meal
                </button>
            </div>
        </div>
    );
};
