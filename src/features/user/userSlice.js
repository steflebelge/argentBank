import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    email: 'steve@rogers.com',
    password: 'password456',
    firstname: null,
    lastname: null,
    token: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setFirstname: (state, action) => {
            state.firstname = action.payload;
        },
        setLastname: (state, action) => {
            state.lastname = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        logout: () => initialState,
    }
});

export const { setEmail, setPassword, setFirstname, setLastname, setToken, logout } = userSlice.actions;
export default userSlice.reducer;
