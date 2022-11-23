import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //checking
        uid:null,
        email:null,
        displayName:null,
        photoURL:null,
        errorMessage:null
    },
    reducers: {
        login: (state,action /* action */ ) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null;

        },
        logout: (state,{payload} /* action */ ) => {
            state.status='not-auth';
            state.uid=null;
            state.email=null;
            state.displayName=null;
            state.photoURL=null;
            state.errorMessage = payload?.errorMessage;
        },
        checkingCredentials:(state)=>{
            state.status = 'checking';
        },
    }
});


// Action creators are generated for each case reducer function
export const { login,logout,checkingCredentials } = authSlice.actions;