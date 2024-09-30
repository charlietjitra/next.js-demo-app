import firebase_app from "../config";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const auth = getAuth(firebase_app);

export const signUp = async (email, password) => {
    let error = null;
    let result = error;
    try{
        result = await createUserWithEmailAndPassword(auth, email, password);
    }catch(err){
        error = err;
    }
    return { result, error }
}