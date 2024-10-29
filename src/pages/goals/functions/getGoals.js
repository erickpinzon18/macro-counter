import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../../firebaseConfig";

export const GetGoals = async (userId) => {
    try {
        const q = query(collection(db, "users", userId, "goals"));
        const querySnapshot = await getDocs(q);
        const goals = querySnapshot.docs.map((doc) => doc.data());
        return goals;
    } catch (e) {
        console.error("Error al obtener los objetivos: ", e);
        return [];
    }
};
