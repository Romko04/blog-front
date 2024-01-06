import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'
import axios, { getPostsApi } from '../../axios/axiosConfig';

export const fetchPosts = createAsyncThunk(
    'posts',
    async (sortBy) => {
        const response = await getPostsApi(sortBy)
        return response.data
    }
)

const initialState = {
    posts: [],
    isLoading: true

}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state, action) => {
            state.isLoading = true
            state.posts = []
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.isLoading = false
            state.posts = action.payload
        })
    },
})

// Action creators are generated for each case reducer function
export const { } = postsSlice.actions

export default postsSlice.reducer