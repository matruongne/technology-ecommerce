import axios from 'axios'

export function createOrder(order) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3300/api/orders/`, order)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getOrdersByUser() {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/orders/own`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getOrdersById(ordersId) {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/orders/${ordersId}`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function updateOrder(orders) {
	return new Promise(async (resolve) => {
		await axios
			.patch(`http://localhost:3300/api/orders/${orders.id}`, orders)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getAllOrders(sort, pagination) {
	let queryString = ''

	for (let key in sort) {
		queryString += `${key}=${sort[key]}&`
	}
	for (let key in pagination) {
		queryString += `${key}=${pagination[key]}&`
	}

	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3300/api/orders/?` + queryString)
			.then(async (response) => {
				const totalOrders = await response.headers.get('X-Total-Count')
				resolve({ data: { orders: response.data, totalOrders: +totalOrders } })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function deleteOrder(ordersId) {
	return new Promise(async (resolve) => {
		await axios
			.delete(`http://localhost:3300/api/orders/${ordersId}`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
