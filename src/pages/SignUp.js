import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import SignUpImg from '../assets/SignUpImg.jpg'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { validateEmail, validatePassword } from '../utils/validate'
import { isLogin } from '../utils/localstorage'

const SignUp = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (isLogin()) {
			navigate('/')
		}
	}, [])

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confPassword, setConfPassword] = useState('')
	const [name, setName] = useState('')

	const emailRef = useRef()
	const passwordRef = useRef()
	const confPasswordRef = useRef()
	const nameRef = useRef()

	const resetRefClassName = () => {
		nameRef.current.className = nameRef.current.className.replaceAll('border-red-500', '')
		emailRef.current.className = emailRef.current.className.replaceAll('border-red-500', '')
		passwordRef.current.className = passwordRef.current.className.replaceAll('border-red-500', '')
		confPasswordRef.current.className = confPasswordRef.current.className.replaceAll(
			'border-red-500',
			''
		)
	}

	const ConstraintCheck = () => {
		if (!name) {
			toast.error('Invalid Name')
			nameRef.current.className += ' border-red-500'
		}

		if (!validatePassword(password)) {
			toast.error('Invalid Password')
			passwordRef.current.className += ' border-red-500'
		}

		if (password !== confPassword) {
			toast.error('Password does not match!')
			passwordRef.current.className += ' border-red-500'
			confPasswordRef.current.className += ' border-red-500'
		}

		if (!validateEmail(email)) {
			toast.error('Invalid email')
			emailRef.current.className += ' border-red-500'
		}
	}

	const handleSubmit = async () => {
		resetRefClassName()
		ConstraintCheck()
		await axios
			.post('http://localhost:3100/user/signup', { email, password, firstName: name })
			.then((res) => {
				const { result, token } = res.data
				toast.success('Đăng nhập thành công!')
				console.log(result, token)
				navigate('/signin')
			})
			.catch((err) => {
				console.log(err.message)
			})
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
				<div className="relative">
					<img
						src={SignUpImg}
						alt="img"
						className="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
					/>
					<div className="absolute hidden top-72 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block">
						<span className="text-white text-xl">
							We've been uesing Untitle to kick"
							<br />
							start every new project and can't <br />
							imagine working without it."
						</span>
					</div>
				</div>
				<div className="flex flex-col justify-center p-8 md:p-14">
					<span className="mb-3 text-4xl font-bold">Create Account</span>
					<span className="font-light text-gray-400 mb-8">Fill the detail to create account</span>
					<div className="py-4">
						<span className="mb-2 text-md">Name</span>
						<input
							ref={nameRef}
							type="text"
							className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>
					<div className="py-4">
						<span className="mb-2 text-md">Email</span>
						<input
							ref={emailRef}
							type="text"
							className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							name="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="py-4">
						<span className="mb-2 text-md">Password</span>
						<input
							ref={passwordRef}
							type="password"
							name="pass"
							id="pass"
							className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="py-4">
						<span className="mb-2 text-md">Confirm Password</span>
						<input
							ref={confPasswordRef}
							type="password"
							name="Confpass"
							id="Confpass"
							className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
							value={confPassword}
							onChange={(e) => setConfPassword(e.target.value)}
							required
						/>
					</div>
					<button
						onClick={() => handleSubmit()}
						className="w-full bg-black text-white mt-4 p-2 rounded-lg mb-6 border hover:bg-white hover:text-black hover:border hover:border-gray-300"
					>
						Sign Up
					</button>
					<button className="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-black hover:text-white">
						<FcGoogle className="w-6 h-6 inline mr-2" />
						Sign Up with Google
					</button>
					<div className="text-center text-gray-400">
						Have an account?
						<Link className="font-bold text-black" to="/signin">
							{' '}
							Sign In
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SignUp
