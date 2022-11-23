import { loginWithEmailPassword, logOutFirebase, registerUserWithEmail, signInWithGoogle } from "../../firebase/providers";
import { clearNotesLogout } from "../journal/journalSlice";
import { checkingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email,pass) =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());
        // firebase.auth().signInWithEmailAndPassword(email,pass)
        //     .then(({user})=>{
        //         dispatch(login({
        //             uid:user.uid,
        //             email:user.email,
        //             displayName:user.displayName,
        //             photoURL:user.photoURL,
        //         }));
        //     })
        //     .catch((error)=>{
        //         dispatch(loginError(error.message));
        //     })

    }
}
export const startGoogleSignIn = () =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());
       
        const result = await signInWithGoogle()
        if(!result.ok) return dispatch(logout(result.errorMessage))
       
            dispatch(login({
                uid:result.uid,
                email:result.email,
                displayName:result.displayName,
                photoURL:result.photoURL,
            }));

    }
}
export const startCreatingUser = ({email,password,displayName}) =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());
       
        const {
            ok,
            errorMessage,
            uid,
            photoURL} = await registerUserWithEmail({email,password,displayName})
           
        if(!ok) return dispatch(logout({errorMessage}))
        
            dispatch(login({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL,
            }));

    }

}
export const startLoginWithEmail = ({email,password}) =>{
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const res = await loginWithEmailPassword({email, password})
        console.log(res)
        if(!res.ok) return dispatch(logout(res))
        dispatch(login(res))
        

    }
}

export const startLogout = () =>{
    return async(dispatch) => {
        await logOutFirebase();
        dispatch(clearNotesLogout())
        dispatch(logout(null));
    }
}