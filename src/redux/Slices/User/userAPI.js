import axios from 'axios'

export function getLoggedInUserOrders() {
	return new Promise(async (resolve) => {
		await axios
			.get('http://localhost:3100/api/orders/own/')
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getPostsUser() {
	return new Promise(async (resolve) => {
		await axios
			.get('http://localhost:3100/api/post/own/')
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getLoggedInUser() {
	return new Promise(async (resolve) => {
		await axios
			.get('http://localhost:3100/api/user/own')
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function updateUser(update) {
	return new Promise(async (resolve) => {
		await axios
			.patch(`http://localhost:3100/api/user/${update.id}`, update)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
