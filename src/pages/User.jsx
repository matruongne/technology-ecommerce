import useLogin from '../hooks/useLogin'

const User = () => {
	const loginInfo = useLogin()
	console.log(loginInfo)
	return <div>{loginInfo.loginInfo.isLogin ? 'true' : 'false'}</div>
}

export default User
