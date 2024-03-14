import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import User from './pages/User'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import { Toaster } from 'react-hot-toast'
import SignUp from './pages/SignUp'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/users/:userId',
		element: <User />,
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
