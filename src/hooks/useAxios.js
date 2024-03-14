import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { getToken } from '../utils/localstorage'

const useAxios = ({ url, method, body = null }) => {
	const [response, setResponse] = useState(null)
	const [error, setError] = useState('')
	const [loading, setloading] = useState(true)

	const fetchData = useCallback(async () => {
		axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
		axios.defaults.headers.post['Authorization'] = 'Bearer ' + getToken()
		axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'
		await axios[method.toLowerCase()](url, JSON.parse(body))
			.then((res) => {
				setResponse(res)
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setloading(false)
			})
	}, [body, method, url])

	useEffect(() => {
		fetchData()
	}, [method, url, body, fetchData])

	return { response, error, loading }
}

export default useAxios
