import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLoggedInUserOrders, getPostsUser, updateUser, getLoggedInUser } from './userAPI'

const initialState = {
	status: 'idle',
	userInfo: null,
	posts: [],
}

export const getLoggedInUserOrderAsync = createAsyncThunk(
	'user/getLoggedInUserOrders',
	async () => {
		const response = await getLoggedInUserOrders()

		return response.data
	}
)

export const getLoggedInUserAsync = createAsyncThunk('user/getLoggedInUser', async () => {
	const response = await getLoggedInUser()

	return response.data
})

export const updateUserAsync = createAsyncThunk('user/updateUser', async (update) => {
	const response = await updateUser(update)

	return response.data
})

export const getPostsUserAsync = createAsyncThunk('user/getPostsUser', async () => {
	const response = await getPostsUser()

	return response.data
})
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getLoggedInUserOrderAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getLoggedInUserOrderAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.userInfo.orders = action.payload
			})
			.addCase(updateUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'

				state.userInfo = action.payload
			})
			.addCase(getLoggedInUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getLoggedInUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.userInfo = action.payload
			})
			.addCase(getPostsUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getPostsUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.posts = action.payload
			})
	},
})

export const selectUserOrders = (state) => state.user.userInfo.orders
export const selectUserInfo = (state) => state.user.userInfo
export const selectUserInfoStatus = (state) => state.user.status
export const selectPosts = (state) => state.user.posts

export default userSlice.reducer
