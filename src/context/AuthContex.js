'use client'
import React from "react";
import { onAuthStateChanged, getAuth } from 'firebase/auth';
import firebase_app from "@/app/firebase/config";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children, }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user);
            }else{
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribed();
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>
            {loading ? <div>Loading ... </div> : children}
        </ AuthContext.Provider >
    );
};