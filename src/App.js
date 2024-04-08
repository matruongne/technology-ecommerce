import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './pages/User'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'
import Category from './pages/Category'
import ProductDetail from './pages/ProductDetail'
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'
import { getLoggedInUserAsync } from '../src/redux/Slices/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import {
	checkAuthAsync,
	selectLoggedInUser,
	selectUserChecked,
} from './redux/Slices/Auth/authSlice'
import { useEffect } from 'react'
import Protected from './components/auth/Protected'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<Protected>
				<Home></Home>
			</Protected>
		),
	},
	{
		path: '/user/own',
		element: (
			<Protected>
				<User></User>
			</Protected>
		),
	},
	{
		path: '/:category',
		element: <Category />,
	},
	{
		path: '/category/:productId',
		element: <ProductDetail />,
	},
	,
	{
		path: '/blog',
		element: (
			<Protected>
				<Blog></Blog>
			</Protected>
		),
	},
	{
		path: '/blog/:blogId',
		element: <BlogDetail />,
	},
	{
		path: '/signin',
		element: <SignIn />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
])

function App() {
	const dispatch = useDispatch()
	const user = useSelector(selectLoggedInUser)
	const userChecked = useSelector(selectUserChecked)

	useEffect(() => {
		dispatch(checkAuthAsync())
	}, [dispatch])

	useEffect(() => {
		if (user) {
			dispatch(getLoggedInUserAsync())
		}
	}, [dispatch, user])
	return (
		<>
			{userChecked && (
				<>
					<Toaster />
					<div>
						<RouterProvider router={router} />
					</div>
				</>
			)}
		</>
	)
}

export default App
