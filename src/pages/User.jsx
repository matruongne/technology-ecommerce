import React from 'react'
import useLogin from '../hooks/useLogin'
import { useParams } from 'react-router-dom'

const User = () => {
	const { userId } = useParams()

	const loginInfo = useLogin({ userId })
	return <div>{loginInfo.loginInfo.isLogin ? 'true' : 'false'}</div>
}

export default User
