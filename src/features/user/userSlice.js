import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        email: 'steve@rogers.com',
        password: 'password456',
        firstname: null,
        lastname: null,
        token: null,
    },
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
        }
    }
});

export const { setEmail, setPassword, setFirstname, setLastname, setToken } = userSlice.actions;
export default userSlice.reducer;
