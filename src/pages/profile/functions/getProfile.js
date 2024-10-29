import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

/**
 * Función para obtener el perfil de un usuario desde la base de datos.
 * @param {string} uid - ID del usuario.
 * @returns {Promise<Object|null>} - Promesa que resuelve con el perfil del usuario o null si no se encuentra.
 */
export const getProfile = async (uid) => {
    try {
        const profileRef = doc(db, "users", uid, "profile", "userProfile");
        const profileSnap = await getDoc(profileRef);

        if (profileSnap.exists()) {
            return profileSnap.data();
        } else {
            console.log("No se encontró el perfil del usuario");
            return null;
        }
    } catch (e) {
        console.error("Error al obtener el perfil: ", e);
        return null;
    }
};
