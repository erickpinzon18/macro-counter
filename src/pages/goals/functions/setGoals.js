import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para establecer las metas de un usuario en la base de datos.
 * @param {string} userId - ID del usuario.
 * @param {Object} goals - Objeto con las metas del usuario.
 * @param {string} goals.goalType - Tipo de objetivo (volumen, definición, mantenimiento).
 * @param {number} goals.dailyCalories - Calorías diarias.
 * @param {number} goals.proteinGoal - Meta de proteínas en gramos.
 * @param {number} goals.carbGoal - Meta de carbohidratos en gramos.
 * @param {number} goals.fatGoal - Meta de grasas en gramos.
 * @param {number} goals.targetWeight - Peso objetivo en kg.
 * @returns {Promise<void>} - Promesa que se resuelve cuando las metas se han guardado.
 */
export const setGoals = async (userId, goals) => {
    try {
        const goalsRef = doc(db, "users", userId, "goals", "userGoals");
        await setDoc(goalsRef, goals);
    } catch (e) {
        console.error("Error al establecer las metas: ", e);
    }
};
