import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createBrand, getAllBrand } from './brandAPI'

const initialState = {
	status: 'idle',
	brands: [],
}

export const createBrandAsync = createAsyncThunk('brand/createBrand', async (brand) => {
	const response = await createBrand(brand)
	return response.data
})

export const getAllBrandAsync = createAsyncThunk('brand/getAllBrand', async () => {
	const response = await getAllBrand()
	return response.data
})

export const brandSlice = createSlice({
	name: 'brand',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(createBrandAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createBrandAsync.fulfilled, (state, action) => {
				state.status = 'idle'
			})
			.addCase(getAllBrandAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getAllBrandAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.brands = action.payload
			})
	},
})

export const selectAllBrands = (state) => state.brand.brands

export default brandSlice.reducer
