import React, { useState } from "react";
import { addMeal } from "./functions/addMeal";
import { useAuth } from "../../auth/authContext";

export const AddMeal = () => {
    const [mealName, setMealName] = useState("");
    const [grams, setGrams] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fats, setFats] = useState("");
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newMeal = {
            mealName,
            grams: parseFloat(grams),
            protein: parseFloat(protein),
            carbs: parseFloat(carbs),
            fats: parseFloat(fats),
            date: new Date().toLocaleDateString(),
        };

        if (currentUser) {
            console.log("Usuario actual:", currentUser.uid);
            await addMeal(newMeal, currentUser.uid);
        }

        setMealName("");
        setGrams("");
        setProtein("");
        setCarbs("");
        setFats("");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Register New Meal
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Meal Name */}
                    <div>
                        <label className="block text-gray-700">Meal Name</label>
                        <input
                            type="text"
                            value={mealName}
                            onChange={(e) => setMealName(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="E.g. Grilled Chicken"
                        />
                    </div>

                    {/* Grams */}
                    <div>
                        <label className="block text-gray-700">
                            Quantity (g)
                        </label>
                        <input
                            type="number"
                            value={grams}
                            onChange={(e) => setGrams(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="E.g. 150"
                        />
                    </div>

                    {/* Proteins */}
                    <div>
                        <label className="block text-gray-700">
                            Proteins (g)
                        </label>
                        <input
                            type="number"
                            value={protein}
                            onChange={(e) => setProtein(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="E.g. 20"
                        />
                    </div>

                    {/* Carbohydrates */}
                    <div>
                        <label className="block text-gray-700">
                            Carbohydrates (g)
                        </label>
                        <input
                            type="number"
                            value={carbs}
                            onChange={(e) => setCarbs(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="E.g. 30"
                        />
                    </div>

                    {/* Fats */}
                    <div>
                        <label className="block text-gray-700">Fats (g)</label>
                        <input
                            type="number"
                            value={fats}
                            onChange={(e) => setFats(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border rounded"
                            placeholder="E.g. 10"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-bold py-2 rounded mt-4 hover:bg-blue-600"
                    >
                        Register Meal
                    </button>
                </form>
            </div>
        </div>
    );
};
