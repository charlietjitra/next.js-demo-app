import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

export const addData =  async (collection, id, data) => {
    let result = null;
    let error = null;

    try{
        result = await setDoc(doc(db, collection, id), data, {
            merge:true,
        });
    }catch(e){
        error = e;
    }
    return { result, error };
}