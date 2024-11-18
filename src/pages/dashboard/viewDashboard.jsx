import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import { getMeals } from "../meals/functions/getMeals";
import { LineChart } from "@mui/x-charts";

export const ViewDashboard = () => {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loadingMeals, setLoadingMeals] = useState(true);

    const userProfile = {
        activityLevel: "moderado",
        age: 21,
        bodyFat: 15,
        height: 172,
        muscleMass: 25,
        name: "Erick Pinzon",
        weight: 67,
    };

    const userGoals = {
        carbGoal: 400,
        dailyCalories: 3000,
        fatGoal: 100,
        goalType: "bulking",
        proteinGoal: 140,
        targetWeight: 70,
    };

    useEffect(() => {
        const fetchMeals = async () => {
            if (currentUser) {
                const userMeals = await getMeals(currentUser.uid);
                setMeals(userMeals);
                setLoadingMeals(false);
            }
        };

        fetchMeals();
    }, [currentUser]);

    const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);
    const totalCarbs = meals.reduce((acc, meal) => acc + meal.carbs, 0);
    const totalFats = meals.reduce((acc, meal) => acc + meal.fats, 0);

    const chartData = meals.map((meal, index) => ({
        name: `Meal ${index + 1}`,
        protein: meal.protein,
        carbs: meal.carbs,
        fats: meal.fats,
    }));

    const proteinData = chartData.map((data) => data.protein);
    const carbsData = chartData.map((data) => data.carbs);
    const fatsData = chartData.map((data) => data.fats);
    const xLabels = chartData.map((data) => data.name);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-blue-600">
                        Welcome, {userData?.email || userProfile.name}!
                    </h1>
                    <p className="text-gray-500">
                        Member since:{" "}
                        {userData?.createdAt.toDate().toLocaleDateString() ||
                            "N/A"}
                    </p>
                </header>

                <div className="flex">
                    {/* User Profile */}
                    <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex-auto mr-3">
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
                    <section className="bg-white p-6 rounded-lg shadow-md mb-6 flex ml-3">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                Nutrient Intake Chart
                            </h2>
                            <LineChart
                                width={500}
                                height={300}
                                series={[
                                    { data: proteinData, label: "Protein" },
                                    { data: carbsData, label: "Carbs" },
                                    { data: fatsData, label: "Fats" },
                                ]}
                                xAxis={[{ scaleType: "point", data: xLabels }]}
                                className="mx-auto"
                            />
                        </div>
                    </section>
                </div>

                {/* User Goals */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Goals
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
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
                        <div className="grid grid-cols-3 gap-4">
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
