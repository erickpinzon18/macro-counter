import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para establecer el perfil de un usuario en la base de datos.
 * @param {string} userId - ID del usuario.
 * @param {Object} profile - Objeto con la información del perfil del usuario.
 * @param {string} profile.name - Nombre completo del usuario.
 * @param {number} profile.age - Edad del usuario.
 * @param {number} profile.weight - Peso del usuario en kg.
 * @param {number} profile.height - Altura del usuario en cm.
 * @param {number} profile.bodyFat - Porcentaje de grasa corporal del usuario.
 * @param {number} profile.muscleMass - Masa muscular del usuario en kg.
 * @param {string} profile.activityLevel - Nivel de actividad del usuario.
 * @returns {Promise<void>} - Promesa que se resuelve cuando el perfil se ha guardado.
 */
export const setProfile = async (userId, profile) => {
    try {
        const profileRef = doc(db, "users", userId, "profile", "userProfile");
        await setDoc(profileRef, profile);
    } catch (e) {
        console.error("Error al establecer el perfil: ", e);
    }
};
