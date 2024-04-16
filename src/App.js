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
import Cart from './pages/Cart'
import Order from './pages/Order'
import CheckOut from './pages/CheckOut'
import OrderSuccess from './pages/OrderSuccess'
import OrderDetail from './pages/OrderDetail'
import PageNotFound from './pages/404'
import ProtectedAdmin from './components/auth/ProtectedAdmin'
import AdminHome from './pages/AdminHome'
import AddProduct from './pages/AddProduct'
import AdminOrders from './pages/AdminOrders'

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
		path: '/admin',
		element: (
			<ProtectedAdmin>
				<AdminHome></AdminHome>
			</ProtectedAdmin>
		),
	},
	{
		path: '/admin/add-product',
		element: (
			<ProtectedAdmin>
				<AddProduct></AddProduct>
			</ProtectedAdmin>
		),
	},
	{
		path: '/admin/edit-product/:id',
		element: (
			<ProtectedAdmin>
				<AddProduct></AddProduct>
			</ProtectedAdmin>
		),
	},
	{
		path: '/admin/orders',
		element: (
			<ProtectedAdmin>
				<AdminOrders></AdminOrders>
			</ProtectedAdmin>
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
		path: '/shops',
		element: (
			<Protected>
				<Category></Category>
			</Protected>
		),
	},
	{
		path: '/category/:productId',
		element: (
			<Protected>
				<ProductDetail></ProductDetail>
			</Protected>
		),
	},
	{
		path: '/carts/own',
		element: (
			<Protected>
				<Cart></Cart>
			</Protected>
		),
	},
	{
		path: '/orders/own',
		element: (
			<Protected>
				<Order></Order>
			</Protected>
		),
	},
	{
		path: '/orders/:id',
		element: (
			<Protected>
				<OrderDetail></OrderDetail>
			</Protected>
		),
	},
	{
		path: '/checkout',
		element: (
			<Protected>
				<CheckOut></CheckOut>
			</Protected>
		),
	},
	{
		path: '/order-success/:id',
		element: (
			<Protected>
				<OrderSuccess></OrderSuccess>
			</Protected>
		),
	},
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
		element: (
			<Protected>
				<BlogDetail></BlogDetail>
			</Protected>
		),
	},
	{
		path: '/signin',
		element: <SignIn />,
	},
	{
		path: '/signup',
		element: <SignUp />,
	},
	{
		path: '*',
		element: <PageNotFound></PageNotFound>,
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
