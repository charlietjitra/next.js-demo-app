'use client'

import "../globals.css"
import React from "react";
import { signUp } from "../firebase/auth/signup";
import { useRouter } from 'next/navigation'
import { addData } from "../firebase/firestore/addData";

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fname, setFname] = React.useState('');
    const [lname, setLname] = React.useState('');
    const router = useRouter();

    const handleForm = async (event) => {
        event.preventDefault()
    
        const { result, error } = await signUp(email, password);
  
        if (error) {
            console.error("Error signing up:", error);
            return; // Stop here if sign-up fails
        }

        const userId = result?.user?.uid;
    
        const userData = { 
            fname: fname,
            lname: lname,             
            email: email,
            createdAt: new Date(),
        };

        // Attempt to add user data to Firestore
        const { result: firestoreResult, error: firestoreError } = await addData('users', userId, userData);

        if (firestoreError) {
            console.error("Error adding user data to Firestore:", firestoreError);
            return; // Handle Firestore error
        }

        // If successful, redirect to admin page
        console.log("User data successfully added to Firestore");
        return router.push("/admin");
    }

    return (
        <div className="wrapper">
            <div className="form-wrapper">
                <h1 className="mt-60 mb-30">Sign up</h1>
                <form onSubmit={handleForm} className="form">
                    <label htmlFor="fname">
                        <p>First Name</p>
                        <input onChange={(e) => setFname(e.target.value)} required type="text" name="fname" id="fname" placeholder="First Name" />
                    </label>
                    <label htmlFor="lname">
                        <p>Last Name</p>
                        <input onChange={(e) => setLname(e.target.value)} required type="text" name="lname" id="lname" placeholder="Last Name" />
                    </label>
                    <label htmlFor="email">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password">
                        <p>Password</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" placeholder="password" />
                    </label>
                    <button type="submit">Sign up</button>
                </form>
            </div>
        </div>
    );
}

export default Page;
