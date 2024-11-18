import {
    collection,
    query,
    getDocs,
    where,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para obtener las comidas de un usuario desde la base de datos.
 * @param {string} userId - ID del usuario.
 * @returns {Promise<Array>} - Promesa que resuelve con un array de comidas.
 */
export const getMeals = async (userId) => {
    try {
        const q = query(
            collection(db, "users", userId, "meals"),
            orderBy("createdAt", "asc"),
            limit(30)
        );
        const querySnapshot = await getDocs(q);
        const meals = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            const createdAt = new Date(data.createdAt.seconds * 1000);
            const adjustedDate = new Date(
                createdAt.getTime() - 6 * 60 * 60 * 1000
            );
            const formattedDate = adjustedDate.toISOString().split("T")[0];
            return {
                id: doc.id,
                ...data,
                date: formattedDate,
            };
        });
        return meals;
    } catch (e) {
        console.error("Error al obtener las comidas: ", e);
        return [];
    }
};

export const getDailyMeals = async (userId) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(
            collection(db, "users", userId, "meals"),
            where("createdAt", ">=", today)
        );
        const querySnapshot = await getDocs(q);
        const meals = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return meals;
    } catch (e) {
        console.error("Error al obtener las comidas de hoy: ", e);
        return [];
    }
};
