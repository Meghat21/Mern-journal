import {createSlice, current} from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    error:null,
    loading:null
}

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        signInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        updateInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        updateInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        deleteInStart:(state)=>{
            state.loading=true;
            state.error=null;
        },
        deleteInSuccess:(state,action)=>{
            state.currentUser=null;
            state.loading=false;
            state.error=null;
        },
        deleteInFailure:(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        },
        signotuSuccess:(state)=>{
            state.currentUser=null;
            state.error=null;
            state.loading=false;
        }

    }

});

export const {signInFailure,signInStart,signInSuccess,updateInFailure,updateInStart,updateInSuccess,deleteInFailure,deleteInStart,deleteInSuccess,signotuSuccess} =userSlice.actions

export default userSlice.reducer;