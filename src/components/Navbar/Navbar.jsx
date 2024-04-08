import { Menu, Transition } from '@headlessui/react'
import { FaCaretDown, FaCartShopping, FaCircleUser } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import { IoBagCheckOutline } from 'react-icons/io5'
import { PiUserList } from 'react-icons/pi'

import DarkMode from './DarkMode'
import Search from '../Search/Search'
import { useEffect, useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useDispatch } from 'react-redux'
import { signOutAsync } from '../../redux/Slices/Auth/authSlice'

const MenuLinks = [
	{
		id: 1,
		name: 'Home',
		link: '/#',
	},
	{
		id: 2,
		name: 'Shop',
		link: '/#shop',
	},
	{
		id: 3,
		name: 'About',
		link: '/#about',
	},
	{
		id: 4,
		name: 'Blogs',
		link: '/#blog',
	},
	{
		id: 5,
		name: 'Link',
		link: '/#link',
		// DropdownLinks: [
		// 	{
		// 		id: 1,
		// 		name: 'Trending Products',
		// 		link: '/#',
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Best Selling',
		// 		link: '/#',
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Top Rated',
		// 		link: '/#',
		// 	},
		// ],
	},
]
const Navbar = ({ userInfo }) => {
	const [user, setUser] = useState({})
	const navigate = useNavigate()
	const dispatch = useDispatch()
	useEffect(() => {
		setUser(userInfo)
	}, [userInfo])

	return (
		<div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
			<div className="py-4">
				<div className="container flex justify-between items-center">
					{/* Logo and Links section */}
					<div className="flex items-center gap-4">
						<Link
							to="/"
							className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
						>
							Eshop
						</Link>
						{/* Menu Items */}
						<div className="hidden lg:block">
							<ul className="flex items-center gap-4">
								{MenuLinks.map((data, index) => (
									<li key={index}>
										<a
											href={data.link}
											className="inline-block px-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white duration-200"
										>
											{' '}
											{data.name}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Navbar Right section */}
					<div className="flex justify-between items-center gap-4">
						{/* Search Bar section */}
						<div className="relative group hidden sm:block">
							<Search />
						</div>
						{/* Order-button section */}
						<button className="relative p-3" onClick={() => {}}>
							<FaCartShopping className="cursor-pointer text-xl text-gray-600 dark:text-gray-400" />
							<div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
								4
							</div>
						</button>
						{user ? (
							<>
								<Menu as="div" className="relative inline-block text-left">
									<div>
										<Menu.Button>
											<FaCircleUser className="cursor-pointer text-2xl text-gray-600 dark:text-gray-400" />
										</Menu.Button>
									</div>
									<Transition
										as={Fragment}
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
											<div>
												<Menu.Item>
													{({ active }) => (
														<button
															className={`${
																active ? 'bg-secondary text-white' : 'text-gray-900'
															} group font-semibold flex w-full items-center rounded-md px-2 py-3 text-sm`}
														>
															{active ? (
																<IoBagCheckOutline className="mr-2 h-5 w-5" aria-hidden="true" />
															) : (
																<IoBagCheckOutline className="mr-2 h-5 w-5" aria-hidden="true" />
															)}
															My Orders
														</button>
													)}
												</Menu.Item>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => {
																navigate('/user/own')
															}}
															className={`${
																active ? 'bg-secondary text-white' : 'text-gray-900'
															} group font-semibold flex w-full items-center rounded-md px-2 py-3 text-sm`}
														>
															{active ? (
																<PiUserList className="mr-2 h-5 w-5" aria-hidden="true" />
															) : (
																<PiUserList className="mr-2 h-5 w-5" aria-hidden="true" />
															)}
															My Profile
														</button>
													)}
												</Menu.Item>
												<div className="mx-auto lg:mx-0 w-full border-b-2 border-primary opacity-25"></div>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => {
																dispatch(signOutAsync())
															}}
															className={`${
																active
																	? 'bg-primary text-white'
																	: 'text-primary dark:hover:text-white'
															} group font-semibold uppercase flex w-full items-center rounded-md px-2 py-4 text-sm`}
														>
															{active ? (
																<MdLogout className="mr-2 h-5 w-5 text-white" aria-hidden="true" />
															) : (
																<MdLogout
																	className="mr-2 h-5 w-5 text-secondwary"
																	aria-hidden="true"
																/>
															)}
															LogOut
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</>
						) : (
							<div>
								<Button
									text="Sign in"
									classNames={'text-sm font-semibold py-2 px-2 rounded-l-xl bg-primary text-white'}
									handler={() => {
										navigate('/signin')
									}}
								/>
								{/* <span className="border-l border-gray-200 dark:border-gray-800"></span> */}
								<Button
									text="Sign up"
									classNames={
										'text-sm font-semibold py-2 px-2 rounded-r-xl bg-secondary text-white'
									}
									handler={() => {
										navigate('/signup')
									}}
								/>
							</div>
						)}
						{/* Dark Mode section */}
						<div>
							<DarkMode />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Navbar
