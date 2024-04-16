import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectLoggedInUser } from '../../redux/Slices/Auth/authSlice'
import { selectUserInfo } from '../../redux/Slices/User/userSlice'

function ProtectedAdmin({ children }) {
	const user = useSelector(selectLoggedInUser)
	const userInfo = useSelector(selectUserInfo)

	if (!user) {
		return <Navigate to="/signin" replace={true}></Navigate>
	}
	if (userInfo && userInfo.role !== 'admin') {
		return <Navigate to="/" replace={true}></Navigate>
	}
	return children
}

export default ProtectedAdmin
