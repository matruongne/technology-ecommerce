import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createCategory, getAllCategory } from './categoryAPI'

const initialState = {
	status: 'idle',
	categories: [],
}

export const createCategoryAsync = createAsyncThunk('category/createCategory', async (category) => {
	const response = await createCategory(category)
	return response.data
})

export const getAllCategoryAsync = createAsyncThunk('category/getAllCategory', async () => {
	const response = await getAllCategory()
	return response.data
})

export const categorySlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createCategoryAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createCategoryAsync.fulfilled, (state, action) => {
				state.status = 'idle'
			})
			.addCase(getAllCategoryAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getAllCategoryAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.categories = action.payload
			})
	},
})

export const selectAllCategories = (state) => state.category.categories

export default categorySlice.reducer
