import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function Protected({ children }) {
	const user = useSelector((state) => state.user)

	if (!userInfo.isSignin) {
		return <Navigate to="/signin" replace={true}></Navigate>
	}
	return children
}

export default Protected
