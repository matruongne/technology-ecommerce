import axios from 'axios'

export function createCategory(category) {
	return new Promise(async (resolve) => {
		await axios
			.post(`http://localhost:3100/api/categories/`, category)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getAllCategory() {
	return new Promise(async (resolve) => {
		await axios
			.get(`http://localhost:3100/api/categories/`)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
