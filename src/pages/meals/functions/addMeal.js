import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para agregar una comida a la base de datos.
 * @param {Object} meal - Objeto que contiene los datos de la comida.
 * @param {string} meal.mealName - Nombre de la comida.
 * @param {number} meal.grams - Cantidad en gramos.
 * @param {number} meal.protein - Cantidad de proteínas en gramos.
 * @param {number} meal.carbs - Cantidad de carbohidratos en gramos.
 * @param {number} meal.fats - Cantidad de grasas en gramos.
 * @param {string} userId - ID del usuario que agrega la comida.
 */
export const addMeal = async (meal, userId) => {
    try {
        await addDoc(collection(db, "users", userId, "meals"), {
            ...meal,
            createdAt: Timestamp.now(),
        });
    } catch (e) {
        console.error("Error al registrar la comida: ", e);
    }
};
