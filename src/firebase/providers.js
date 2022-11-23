import {createUserWithEmailAndPassword, GoogleAuthProvider,signInWithEmailAndPassword,signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { uid, email, displayName, photoURL } = user;
        return {
            ok:true,
            uid,
            email,
            displayName,
            photoURL
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.message
        return {
            ok:false,
            errorMessage
        }
    }
}
export const registerUserWithEmail = async({email,password,displayName}) => {
    try {
        const result = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        // const credentials = GoogleAuthProvider.credentialFromResult(result);
        const user = result.user;
        const { uid,photoURL } = user;
        
        await updateProfile(FirebaseAuth.currentUser, {
            displayName
        })

        return {
            ok:true,
            uid,
            photoURL,
            email,displayName
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.message
        return {
            ok:false,
            errorMessage
        }
    }
}

export const loginWithEmailPassword = async({email, password}) =>{
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const user = result.user;
        const { uid, displayName, photoURL } = user;
        return {
            ok:true,
            uid,
            email,
            displayName,
            photoURL
        }
    } catch (error) {
        console.log(error);
        const errorMessage = error.message
        return {
            ok:false,
            errorMessage
        }
    }
}
export const logOutFirebase = async() =>{
    return await FirebaseAuth.signOut();
}