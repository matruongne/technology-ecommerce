import axios from 'axios'

export function createUser(userData) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post('http://localhost:3100/api/auth/signup', userData)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((err) => {
				reject('Error to login: ' + err.response.data.error.errors[0].message)
			})
	})
}

export function loginUser(loginInfo) {
	return new Promise(async (resolve, reject) => {
		await axios
			.post('http://localhost:3100/api/auth/login', loginInfo)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((err) => {
				reject('Error to login: ' + err.response.data)
			})
	})
}

export function checkAuth() {
	return new Promise(async (resolve, reject) => {
		await axios
			.get('http://localhost:3100/api/auth/check')
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export function signOut() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get('http://localhost:3100/api/auth/logout')
			console.log(response)
			if ((response.data = 'OK')) {
				resolve({ data: 'success' })
			}
		} catch (error) {
			console.log(error)
			reject(error)
		}
	})
}
