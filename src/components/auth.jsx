import { useState } from "react";
import { auth, googleAuthProvider } from "../config/firebase"
import { createUserWithEmailAndPassword , signInWithPopup, signOut} from "firebase/auth"
import { ChangeEvent } from "react";

export const Auth = ()=>{

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");

    console.log(auth?.currentUser?.email);
    console.log(auth?.currentUser?.photoURL);

    const signIn = async () =>{
        try {
            await createUserWithEmailAndPassword(auth,email,password);
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithGoogle = async () =>{
        try {
            await signInWithPopup(auth,googleAuthProvider);
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () =>{
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return(
        <div>
            <input type="text" placeholder="Email" onChange={(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signIn}>Sign In</button>

            <button onClick={signInWithGoogle}>Sign in with Google</button>

            <button onClick={logout}>Logout</button>
        </div>
    )
}