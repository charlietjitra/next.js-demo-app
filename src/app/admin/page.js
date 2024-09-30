'use client'
import { getData } from "../firebase/firestore/getData";
import React, { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContex";
import { useRouter } from "next/navigation";

function Page(){
    const [ userData, setUserData ] = useState({ fname: 'Loading...', lname: '' });
    const { user, loading } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if(!loading&&user == null){ router.push("/")}

        const fetchUserData = async () => {
            if(user){
                const { result, error } = await getData('users', user.uid);
                if (error) {
                    console.error("Error fetching user data:", error);
                    return;
                } 
                
                if (result&&result.exists()) {
                    setUserData(result.data());
                } else {
                    console.log("Data doesnt exist");
                }
            }
        };
        
        fetchUserData();

    }, [loading, user]);

    if(loading || user == null){
        return <div>Loading ... </div>
    }

    return (<h1>Welcome, {`${userData.fname}  ${userData.lname}`}</h1>);
}

export default Page;

