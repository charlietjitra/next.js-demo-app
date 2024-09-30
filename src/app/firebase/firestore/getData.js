import { db } from "../config";
import { doc, getDoc } from "firebase/firestore";

export const getData = async (collection, id) => {
    let docRef = doc(db, collection, id);

    let result = null;
    let error = null;

    try{
        result = await getDoc(docRef);
    }catch(e){
        error = e;
    }

    return { result, error };
}