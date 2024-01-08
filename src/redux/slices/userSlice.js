import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  { authMeApi, loginApi, registerApi } from '../../axios/axiosConfig';

import Cookies from 'js-cookie';


export const fetchAuth = createAsyncThunk(
    '/auth/register',
    async (sortBy) => {
        const response = await registerApi(sortBy)
        return response.data
    }
)
export const fetchAuthLogin = createAsyncThunk(
    '/auth/login',
    async (data) => {
        const response = await loginApi(data)
        return response.data
    }
)
export const fetchAuthMe = createAsyncThunk(
    '/auth/me',
    async (token) => {
        const response = await authMeApi(token)
        return response.data
    }
)

const initialState = {
    user: {},
    isAuth: false

}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logoutUser(state) {
            state.isAuth = false
            Cookies.remove('auth_token')
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state, action) => {
            state.isAuth = false
            state.user = {}
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
            console.log(action.payload);
            Cookies.set('auth_token', action.payload.token, { expires: 7, path: '/' });
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
        })
        builder.addCase(fetchAuthLogin.pending, (state, action) => {
            state.isAuth = false
            state.user = {}
        })
        builder.addCase(fetchAuthLogin.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
            console.log(action.payload);
            Cookies.set('auth_token', action.payload.token, { expires: 7, path: '/' });
        })
    },
})

// Action creators are generated for each case reducer function
export const { logoutUser} = userSlice.actions


export default userSlice.reducer