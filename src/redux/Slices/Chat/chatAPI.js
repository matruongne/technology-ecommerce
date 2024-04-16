import axios from 'axios'

export function createConversation(conversation) {
	return new Promise(async (resolve) => {
		await axios
			.post('http://localhost:3300/api/conversations/', conversation)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function sendMessage(message) {
	return new Promise(async (resolve) => {
		await axios
			.post('http://localhost:3300/api/message/', message)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}

export function getConversation(userId) {
	return new Promise(async (resolve) => {
		await axios
			.get('http://localhost:3300/api/conversations/' + userId)
			.then((response) => {
				resolve({ data: response.data })
			})
			.catch((error) => {
				console.log(error)
			})
	})
}
