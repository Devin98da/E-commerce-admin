import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'User',
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isFetching = false;
            state.error = false;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        resetError:(state)=>{
            state.error = false;
        },
        logout : (state) => {
            state.currentUser = null;
        }
    }
});

export const { loginStart, loginSuccess, loginFailure , resetError, logout} = userSlice.actions;
export default userSlice.reducer;