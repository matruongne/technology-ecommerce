import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { createOrder, getAllOrders, getOrdersById, getOrdersByUser, updateOrder } from './orderAPI'

const initialState = {
	status: 'idle',
	orders: [],
	allOrders: [],
	currentOrder: null,
	totalOrders: 0,
	order: null,
}

export const createOrderAsync = createAsyncThunk('order/createOrder', async (order) => {
	const response = await createOrder(order)
	toast.success('Created new order')
	return response.data
})

export const updateOrderAsync = createAsyncThunk('order/updateOrder', async (order) => {
	const response = await updateOrder(order)
	return response.data
})

export const getAllOrdersAsync = createAsyncThunk(
	'order/fetchAllOrders',
	async ({ sort, pagination }) => {
		const response = await getAllOrders(sort, pagination)
		return response.data
	}
)

export const getOrdersByUserAsync = createAsyncThunk('order/getOrdersByUser', async () => {
	const response = await getOrdersByUser()
	return response.data
})

export const getOrdersByIdAsync = createAsyncThunk('order/getOrdersById', async (orderId) => {
	const response = await getOrdersById(orderId)
	return response.data
})
export const orderSlice = createSlice({
	name: 'order',
	initialState,
	reducers: {
		resetOrder: (state) => {
			state.currentOrder = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createOrderAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(createOrderAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				console.log(action.payload)
				state?.orders?.push(action.payload)
				state.currentOrder = action.payload
			})
			.addCase(getAllOrdersAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getAllOrdersAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.allOrders = action.payload.orders
				state.totalOrders = action.payload.totalOrders
			})
			.addCase(updateOrderAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(updateOrderAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				const index = state.allOrders.findIndex((order) => order.id === action.payload.id)
				state.allOrders[index] = action.payload
			})
			.addCase(getOrdersByUserAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getOrdersByUserAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.orders = action.payload
			})
			.addCase(getOrdersByIdAsync.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(getOrdersByIdAsync.fulfilled, (state, action) => {
				state.status = 'idle'
				state.order = action.payload
			})
	},
})

export const { resetOrder } = orderSlice.actions

export const selectAllOrders = (state) => state.order.orders //for user
export const selectCurrentOrder = (state) => state.order.currentOrder
export const selectOrders = (state) => state.order.allOrders //all orders
export const selectTotalOrders = (state) => state.order.totalOrders
export const selectOrderById = (state) => state.order.order

export default orderSlice.reducer
