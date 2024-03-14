const token_key = 'E_COMMERCE_TOKEN'

const setToken = (token) => {
	window.localStorage.setItem(token_key, token)
}

const getToken = () => {
	let token = window.localStorage.getItem(token_key)
	if (!!token) return token
	return false
}

const isLogin = () => {
	if (!!getToken()) {
		return true
	}
	return false
}

const logout = () => {
	window.localStorage.clear()
}

export { token_key, setToken, getToken, isLogin, logout }
