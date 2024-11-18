import React, { useEffect, useState } from "react";
import { useAuth } from "../../auth/authContext";
import { useNavigate } from "react-router-dom";
import { getDailyMeals } from "../meals/functions/getMeals";
import { GetGoals } from "../goals/functions/getGoals";
import { PieChart } from "@mui/x-charts";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

function Home() {
    const navigate = useNavigate();
    const { userData, currentUser } = useAuth();
    const [loadingMeals, setLoadingMeals] = useState(true);
    const [proteinGoals, setProteinGoals] = useState(0);
    const [carbGoals, setCarbGoals] = useState(0);
    const [fatGoals, setFatGoals] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbs, setTotalCarbs] = useState(0);
    const [totalFats, setTotalFats] = useState(0);
    const [proteinData, setProteinData] = useState([]);
    const [carbData, setCarbData] = useState([]);
    const [fatData, setFatData] = useState([]);

    useEffect(() => {
        const fetchMeals = async () => {
            if (currentUser) {
                const userMeals = await getDailyMeals(currentUser.uid);
                setTotalProtein(
                    userMeals?.reduce((acc, meal) => acc + meal?.protein, 0)
                );
                setTotalCarbs(
                    userMeals?.reduce((acc, meal) => acc + meal?.carbs, 0)
                );
                setTotalFats(
                    userMeals?.reduce((acc, meal) => acc + meal?.fats, 0)
                );
                setProteinData(
                    userMeals?.map((meal) => ({
                        id: meal?.id,
                        label: meal?.mealName,
                        value: meal?.protein,
                    }))
                );
                setCarbData(
                    userMeals?.map((meal) => ({
                        id: meal?.id,
                        label: meal?.mealName,
                        value: meal?.carbs,
                    }))
                );
                setFatData(
                    userMeals?.map((meal) => ({
                        id: meal?.id,
                        label: meal?.mealName,
                        value: meal?.fats,
                    }))
                );
                setLoadingMeals(false);
            }
        };

        const fetchGoals = async () => {
            if (currentUser) {
                const userGoals = await GetGoals(currentUser.uid);
                setProteinGoals(userGoals[0]?.proteinGoal || 0);
                setCarbGoals(userGoals[0]?.carbGoal || 0);
                setFatGoals(userGoals[0]?.fatGoal || 0);
            }
        };

        fetchMeals();
        fetchGoals();
    }, [currentUser]);

    if (!userData) {
        return <div>Loading...</div>;
    }

    const handleAddMeal = () => {
        navigate("/addMeal");
    };

    const pieParams = {
        height: 200,
        margin: { right: 5 },
        slotProps: { legend: { hidden: true } },
        skipAnimation: true, 
    };

    const addRemainingData = (data, total, goal) => {
        const remaining = goal - total;
        if (remaining > 0) {
            data.push({
                id: "remaining",
                label: "Remaining",
                value: remaining,
                color: "#e0e0e0", 
            });
        }
        return data;
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <header className="mb-6">
                    <h1 className="text-2xl font-semibold text-blue-600">
                        Welcome, {userData?.email}!
                    </h1>
                    <p className="text-gray-500">
                        Member since:{" "}
                        {userData?.createdAt?.toDate().toLocaleDateString()}
                    </p>
                </header>

                {/* Dashboard Resumido */}
                <section className="bg-white p-6 rounded-lg shadow-md mb-6 mr-3 flex-auto">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">
                        Daily Summary
                    </h2>
                    {loadingMeals ? (
                        <div>Loading meals...</div>
                    ) : (
                        <Stack
                            direction="row"
                            width="100%"
                            textAlign="center"
                            spacing={2}
                        >
                            <Box flexGrow={1}>
                                <Typography>
                                    <span className="text-xl font-semibold text-gray-700 mb-2">
                                        Proteins
                                    </span>
                                    <p className={`text-2xl font-bold ${totalProtein <= proteinGoals ? "text-yellow-500" : "text-green-500" }  mb-3`}>
                                        {totalProtein}g
                                    </p>
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: addRemainingData([...proteinData], totalProtein, proteinGoals),
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    {...pieParams}
                                />
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-gray-800 mt-3">
                                            Daily Goal
                                        </h3>
                                        <p className="text-2xl font-bold text-blue-500">
                                            {proteinGoals}g
                                        </p>
                                    </div>
                                </div>
                            </Box>
                            <Box flexGrow={1}>
                                <Typography>
                                    <span className="text-xl font-semibold text-gray-700 mb-2">
                                        Carbs
                                    </span>
                                    <p className={`text-2xl font-bold ${totalCarbs <= carbGoals ? "text-green-500" : "text-yellow-500" }  mb-3`}>
                                        {totalCarbs}g
                                    </p>
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: addRemainingData([...carbData], totalCarbs, carbGoals),
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    {...pieParams}
                                />
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-gray-800 mt-3">
                                            Daily Goal
                                        </h3>
                                        <p className="text-2xl font-bold text-blue-500">
                                            {carbGoals}g
                                        </p>
                                    </div>
                                </div>
                            </Box>
                            <Box flexGrow={1}>
                                <Typography>
                                    <span className="text-xl font-semibold text-gray-700 mb-2">
                                        Fats
                                    </span>
                                    <p className={`text-2xl font-bold ${totalFats <= fatGoals ? "text-green-500" : "text-red-500" }  mb-3`}>
                                        {totalFats}g
                                    </p>
                                </Typography>
                                <PieChart
                                    series={[
                                        {
                                            data: addRemainingData([...fatData], totalFats, fatGoals),
                                            innerRadius: 30,
                                            outerRadius: 100,
                                            paddingAngle: 5,
                                            cornerRadius: 5,
                                        },
                                    ]}
                                    {...pieParams}
                                />
                                <div className="flex justify-center">
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-gray-800 mt-3">
                                            Daily Goal
                                        </h3>
                                        <p className="text-2xl font-bold text-blue-500">
                                            {fatGoals}g
                                        </p>
                                    </div>
                                </div>
                            </Box>
                        </Stack>
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