import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginUser, createUser, signOut, checkAuth } from './authAPI'

const initialState = {
	status: 'idle',
	loggedInUser: null,
	error: null,
	userChecked: false,
}

export const createUserAsync = createAsyncThunk(
	'auth/createUser',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await createUser(userData)
			return response.data
		} catch (error) {
			console.log(error)
			return rejectWithValue(error)
		}
	}
)

export const loginUserAsync = createAsyncThunk(
	'auth/loginUser',
	async (loginInfo, { rejectWithValue }) => {
		try {
			const response = await loginUser(loginInfo)
			return response.data
		} catch (error) {
			console.log(error)
			return rejectWithValue(error)
		}
	}
)

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async () => {
	try {
		const response = await checkAuth()

		return response.data
	} catch (error) {
		console.log(error)
	}
})

export const signOutAsync = createAsyncThunk('auth/signOut', async () => {
	const response = await signOut()

	return response.data
})

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = action.payload
				state.error = null
			})
			.addCase(createUserAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.error = action.payload
			})
			.addCase(loginUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(loginUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = action.payload
			})
			.addCase(loginUserAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.error = action.payload
			})
			.addCase(signOutAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(signOutAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = null
				state.error = null
			})
			.addCase(checkAuthAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(checkAuthAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.loggedInUser = action.payload
				state.userChecked = true
			})
			.addCase(checkAuthAsync.rejected, (state, action) => {
				state.status = 'idle'
				state.userChecked = false
			})
	},
})

export const selectLoggedInUser = (state) => state.auth.loggedInUser
export const selectError = (state) => state.auth.error
export const selectUserChecked = (state) => state.auth.userChecked
export default authSlice.reducer
