import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { setGoals } from "./functions/setGoals";
import { GetGoals } from "./functions/getGoals";

export const SetGoals = () => {
    const [goalType, setGoalType] = useState("bulking");
    const [dailyCalories, setDailyCalories] = useState("");
    const [proteinGoal, setProteinGoal] = useState("");
    const [carbGoal, setCarbGoal] = useState("");
    const [fatGoal, setFatGoal] = useState("");
    const [targetWeight, setTargetWeight] = useState("");
    const { currentUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await setGoals(currentUser.uid, {
            goalType,
            dailyCalories: parseFloat(dailyCalories),
            proteinGoal: parseFloat(proteinGoal),
            carbGoal: parseFloat(carbGoal),
            fatGoal: parseFloat(fatGoal),
            targetWeight: parseFloat(targetWeight),
        });
    };

    useEffect(() => {
        (async () => {
            if (currentUser) {
                const goals = await GetGoals(currentUser.uid);
                
                if (goals) {
                    setGoalType(goals[0].goalType || "bulking");
                    setDailyCalories(goals[0].dailyCalories || "");
                    setProteinGoal(goals[0].proteinGoal || "");
                    setCarbGoal(goals[0].carbGoal || "");
                    setFatGoal(goals[0].fatGoal || "");
                    setTargetWeight(goals[0].targetWeight || "");
                }
            }
        })();
    }, [currentUser]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    Set Your Fitness Goals
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Tipo de objetivo */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Goal Type
                        </label>
                        <select
                            value={goalType}
                            onChange={(e) => setGoalType(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="bulking">Bulking</option>
                            <option value="cutting">Cutting</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    {/* Calorías diarias */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Daily Caloric Goal
                        </label>
                        <input
                            type="number"
                            value={dailyCalories}
                            onChange={(e) => setDailyCalories(e.target.value)}
                            placeholder="Calories"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Metas de macros */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Protein (grams)
                        </label>
                        <input
                            type="number"
                            value={proteinGoal}
                            onChange={(e) => setProteinGoal(e.target.value)}
                            placeholder="Protein"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Carbohydrates (grams)
                        </label>
                        <input
                            type="number"
                            value={carbGoal}
                            onChange={(e) => setCarbGoal(e.target.value)}
                            placeholder="Carbohydrates"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Fat (grams)
                        </label>
                        <input
                            type="number"
                            value={fatGoal}
                            onChange={(e) => setFatGoal(e.target.value)}
                            placeholder="Fat"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            required
                        />
                    </div>
                    {/* Peso objetivo */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Target Weight (kg)
                        </label>
                        <input
                            type="number"
                            value={targetWeight}
                            onChange={(e) => setTargetWeight(e.target.value)}
                            placeholder="Target Weight"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Botón de enviar */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Save Goals
                    </button>
                </form>
            </div>
        </div>
    );
};
