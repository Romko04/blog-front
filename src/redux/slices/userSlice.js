import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  { registerApi } from '../../axios/axiosConfig';

export const fetchAuth = createAsyncThunk(
    '/auth/register',
    async (sortBy) => {
        const response = await registerApi(sortBy)
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
    extraReducers: (builder) => {
        builder.addCase(fetchAuth.pending, (state, action) => {
            state.isAuth = false
            state.user = {}
        })
        builder.addCase(fetchAuth.fulfilled, (state, action) => {
            state.isAuth = true
            state.user = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
// export const { } = postsSlice.actions


export default userSlice.reducer