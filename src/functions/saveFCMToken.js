import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveFCMToken = async (token, userId) => {
    try {
        console.log("Guardando token en Firestore...");
        console.log("Token:", token);
        console.log("userId:", userId);

        await setDoc(
            doc(db, "users", userId),
            {
                fcmToken: token,
            },
            { merge: true }
        );
        console.log("Token saved to database");
    } catch (e) {
        console.error("Error al registrar la comida: ", e);
    }
};
