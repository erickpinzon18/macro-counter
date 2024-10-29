import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import { getMeals } from "../meals/functions/getMeals";

function Home() {
    const { userData, currentUser } = useAuth();
    const navigate = useNavigate();
    const [meals, setMeals] = useState([]);
    const [loadingMeals, setLoadingMeals] = useState(true);

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

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleAddMeal = () => {
        navigate("/addMeal");
    };

    const totalProtein = meals.reduce((acc, meal) => acc + meal.protein, 0);
    const totalCarbs = meals.reduce((acc, meal) => acc + meal.carbs, 0);
    const totalFats = meals.reduce((acc, meal) => acc + meal.fats, 0);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-blue-600">
                        Welcome, {userData.email}!
                    </h1>
                    <p className="text-gray-500">
                        Member since:{" "}
                        {userData.createdAt.toDate().toLocaleDateString()}
                    </p>
                </header>

                {/* Dashboard Resumido */}
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
                                    Proteínas
                                </h3>
                                <p className="text-2xl font-bold text-blue-500">
                                    {totalProtein}g
                                </p>
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium text-gray-800">
                                    Carbohydrates
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

                {/* Botón para agregar comida */}
                <button
                    onClick={handleAddMeal}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-bold hover:bg-blue-600 transition"
                >
                    Add Meal
                </button>
            </div>
        </div>
    );
}

export default Home;
