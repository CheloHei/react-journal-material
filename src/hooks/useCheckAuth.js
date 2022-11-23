import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth/authSlice";
import { startLoadingNotes } from "../store/journal/thunks";

export const useCheckAuth = () => {
    const {status} = useSelector(state =>state.auth)
    const dispatch = useDispatch();
  
    useEffect(() => {
      onAuthStateChanged(FirebaseAuth, async(user) => {
        if(!user) return dispatch(logout('logout'));
        const {displayName, email, uid,photoUrl} = user;
        dispatch(login({displayName, email, uid,photoUrl}));
        dispatch(startLoadingNotes());
      })
  
  
    },[])
    return status;
  
}
