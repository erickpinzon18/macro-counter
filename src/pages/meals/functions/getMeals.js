import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para obtener las comidas de un usuario desde la base de datos.
 * @param {string} userId - ID del usuario.
 * @returns {Promise<Array>} - Promesa que resuelve con un array de comidas.
 */
export const getMeals = async (userId) => {
    try {
        const q = query(collection(db, "users", userId, "meals"));
        const querySnapshot = await getDocs(q);
        const meals = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        return meals;
    } catch (e) {
        console.error("Error al obtener las comidas: ", e);
        return [];
    }
};
