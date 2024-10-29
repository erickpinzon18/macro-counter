import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { GetGoals } from "../goals/functions/getGoals";
import { setProfile } from "./functions/setProfile";
import { getProfile } from "./functions/getProfile"; // Importa la función getProfile

export const UpdateProfile = () => {
    const { userData, currentUser } = useAuth();

    // Campos de perfil
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [bodyFat, setBodyFat] = useState("");
    const [muscleMass, setMuscleMass] = useState("");
    const [activityLevel, setActivityLevel] = useState("sedentario");

    // Metas de usuario
    const [userGoals, setUserGoals] = useState(null);

    useEffect(() => {
        // Cargar metas y perfil al montar el componente
        (async () => {
            if (currentUser) {
                const goals = await GetGoals(currentUser.uid);
                if (goals) {
                    setUserGoals(goals[0]); // Tomar la primera meta si existe
                }

                const profile = await getProfile(currentUser.uid);
                if (profile) {
                    setName(profile.name || "");
                    setAge(profile.age ? profile.age.toString() : "");
                    setWeight(profile.weight ? profile.weight.toString() : "");
                    setHeight(profile.height ? profile.height.toString() : "");
                    setBodyFat(
                        profile.bodyFat ? profile.bodyFat.toString() : ""
                    );
                    setMuscleMass(
                        profile.muscleMass ? profile.muscleMass.toString() : ""
                    );
                    setActivityLevel(profile.activityLevel || "sedentario");
                }
            }
        })();
    }, [currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await setProfile(currentUser.uid, {
            name,
            age: parseInt(age),
            weight: parseInt(weight),
            height: parseInt(height),
            bodyFat: parseInt(bodyFat),
            muscleMass: parseInt(muscleMass),
            activityLevel,
        });
    };

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8 my-10">
                <h2 className="text-2xl font-semibold text-center text-blue-600 mb-6">
                    Profile Information
                </h2>
                {/* Información de usuario */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        <strong>Email:</strong> {userData.email}
                    </p>
                    <p className="text-gray-600">
                        <strong>Account Created:</strong>{" "}
                        {userData.createdAt.toDate().toLocaleDateString()}
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Edad */}
                    <div>
                        <label className="block text-gray-700 mb-1">Age</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="Enter your age"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Peso */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Weight (kg)
                        </label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Enter your weight"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Altura */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Height (cm)
                        </label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Enter your height"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Porcentaje de grasa corporal */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Body Fat Percentage (%)
                        </label>
                        <input
                            type="number"
                            value={bodyFat}
                            onChange={(e) => setBodyFat(e.target.value)}
                            placeholder="Enter your body fat percentage"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Masa muscular */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Muscle Mass (kg)
                        </label>
                        <input
                            type="number"
                            value={muscleMass}
                            onChange={(e) => setMuscleMass(e.target.value)}
                            placeholder="Enter your muscle mass"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {/* Nivel de actividad */}
                    <div>
                        <label className="block text-gray-700 mb-1">
                            Activity Level
                        </label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        >
                            <option value="sedentario">Sedentary</option>
                            <option value="ligero">Lightly Active</option>
                            <option value="moderado">Moderately Active</option>
                            <option value="activo">Very Active</option>
                            <option value="extra">Extremely Active</option>
                        </select>
                    </div>
                    {/* Botón de guardar */}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                    >
                        Save Profile
                    </button>
                </form>
            </div>

            {/* Panel de metas, sólo si existen */}
            {userGoals && (
                <div className="w-80 ml-8 bg-gray-50 p-6 rounded-lg shadow-lg my-10">
                    <h3 className="text-xl font-semibold text-center text-green-600 mb-4">
                        Your Current Goals
                    </h3>
                    <p>
                        <strong>Goal Type:</strong> {userGoals.goalType}
                    </p>
                    <p>
                        <strong>Daily Caloric Goal:</strong>{" "}
                        {userGoals.dailyCalories} kcal
                    </p>
                    <p>
                        <strong>Protein Goal:</strong> {userGoals.proteinGoal} g
                    </p>
                    <p>
                        <strong>Carbohydrate Goal:</strong> {userGoals.carbGoal}{" "}
                        g
                    </p>
                    <p>
                        <strong>Fat Goal:</strong> {userGoals.fatGoal} g
                    </p>
                    <p>
                        <strong>Target Weight:</strong> {userGoals.targetWeight}{" "}
                        kg
                    </p>
                    <button
                        onClick={() => window.location.replace("/setGoals")}
                        className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-200 mt-4"
                    >
                        Update Goals
                    </button>
                </div>
            )}
        </div>
    );
};
