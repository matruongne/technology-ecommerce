import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createComment, createPost, editPost, getAllPosts, getPostById } from './postAPI'

const initialState = {
	status: 'idle',
	totalItems: 0,
	posts: [],
	post: null,
	comment: null,
}

export const getAllPostAsync = createAsyncThunk('post/getAllPosts', async () => {
	const response = await getAllPosts()
	return response.data
})

export const getPostByIdAsync = createAsyncThunk('post/getPostById', async (blogId) => {
	const response = await getPostById(blogId)
	return response.data
})

export const createPostAsync = createAsyncThunk('post/createPost', async (comment) => {
	const response = await createPost(comment)
	return response.data
})

export const editPostAsync = createAsyncThunk('post/editPost', async (post) => {
	const response = await editPost(post)
	return response.data
})

export const createCommentAsync = createAsyncThunk('post/createComment', async (comment) => {
	const response = await createComment(comment)
	return response.data
})

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getAllPostAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getAllPostAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.posts = action.payload
			})
			.addCase(getPostByIdAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getPostByIdAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.post = action.payload
			})
			.addCase(createPostAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createPostAsync.fulfilled, (state, action) => {
				state.status = 'idle'
			})
			.addCase(editPostAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(editPostAsync.fulfilled, (state, action) => {
				state.status = 'idle'
			})
			.addCase(createCommentAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createCommentAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.comment = action.payload
			})
	},
})

export const selectAllPosts = (state) => state.post.posts
export const selectPostById = (state) => state.post.post
export const selectCreateComment = (state) => state.post.comment

export default postSlice.reducer
