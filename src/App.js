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

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/users/own',
		element: <User />,
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
		element: <Blog />,
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
	return (
		<>
			<Toaster />
			<div>
				<RouterProvider router={router} />
			</div>
		</>
	)
}

export default App
