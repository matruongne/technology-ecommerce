import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../utils/localstorage'
import useAxios from './useAxios'

const useLogin = () => {
	const { response, error, loading } = useAxios({
		url: `http://localhost:3100/api/user`,
		method: 'GET',
	})
	const [loginInfo, setLoginInfo] = useState({
		loading: true,
		isLogin: false,
	})
	const navigate = useNavigate()

	const checkLogin = useCallback(async () => {
		if (error) {
			navigate('/')
			logout()
			return
		} else if (response) setLoginInfo({ info: response, loading: loading, isLogin: true })
	}, [error, navigate, response, loading])

	useEffect(() => {
		checkLogin()
	}, [checkLogin])
	return { loginInfo }
}

export default useLogin
