import { Menu, Transition } from '@headlessui/react'
import { FaCartShopping, FaCircleUser } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'
import { IoBagCheckOutline } from 'react-icons/io5'
import { PiUserList } from 'react-icons/pi'

import DarkMode from './DarkMode'
import Search from '../Search/Search'
import { useEffect, useState, Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../Button/Button'
import { useDispatch, useSelector } from 'react-redux'
import { signOutAsync } from '../../redux/Slices/Auth/authSlice'
import {
	DeleteFromCartAsync,
	getCartByUserAsync,
	selectAllCarts,
	updateCartAsync,
} from '../../redux/Slices/Cart/cartSlice'
import { TfiShoppingCartFull } from 'react-icons/tfi'
import classNames from 'classnames'
import { GiTechnoHeart } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
const MenuLinks = [
	{
		id: 1,
		name: 'Home',
		link: '/',
	},
	{
		id: 2,
		name: 'Shop',
		link: '/shops',
	},
	{
		id: 4,
		name: 'Blogs',
		link: '/blog',
	},
]
const Navbar = ({ userInfo }) => {
	const [user, setUser] = useState({})

	const carts = useSelector(selectAllCarts)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCartByUserAsync())
	}, [dispatch])

	useEffect(() => {
		setUser(userInfo)
	}, [userInfo])

	const handleQuantity = (e, cart, type) => {
		e.preventDefault()
		let updateItem = {}
		if (type === 'dec') {
			const decrement = true
			updateItem = {
				cartId: cart.id,
				quantity: 1,
				decrement,
			}
		} else {
			updateItem = {
				cartId: cart.id,
				quantity: 1,
			}
		}
		dispatch(updateCartAsync(updateItem))
	}

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
							Techify
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
											{data?.name}
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
						<div className="relative">
							<>
								<Menu as="div" className="relative inline-block text-left">
									<div>
										<Menu.Button>
											<FaCartShopping className="cursor-pointer text-2xl text-gray-600 dark:text-gray-400" />
											{carts.length > 0 && (
												<div className="w-4 h-4 bg-red-500 text-white rounded-full absolute -top-[8px] -right-2 flex items-center justify-center text-xs">
													{carts.length}
												</div>
											)}
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
										<Menu.Items className="absolute right-0 mt-2 w-[400px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
											<div>
												<div className="text-gray-900 group font-semibold flex w-full items-center rounded-md px-2 py-3 text-sm">
													<TfiShoppingCartFull className="mr-2 h-5 w-5" aria-hidden="true" />
													My Carts
												</div>
												<div className="max-h-[350px] overflow-y-auto">
													{carts?.map((cart, index) => {
														return (
															<Menu.Item key={index}>
																{({ active }) => (
																	<div
																		onClick={() => {
																			navigate('/category/' + cart.Product.id)
																		}}
																		className={`${
																			active ? 'bg-gray-200' : ''
																		} justify-between rounded-lg p-6 sm:flex sm:justify-start`}
																	>
																		{cart.Product?.thumbnail ? (
																			<img
																				src={cart.Product.thumbnail}
																				alt={cart.Product.title}
																				className="w-full rounded-lg sm:w-24 sm:h-16 object-cover object-center"
																			/>
																		) : (
																			<GiTechnoHeart className="w-full rounded-lg sm:w-24 sm:h-16 object-cover object-center" />
																		)}
																		<div className="ml-4 flex w-full items-center justify-between">
																			<div className="mt-5 sm:mt-0 w-full">
																				<h2 className="text-base font-bold text-gray-900">
																					{cart.Product.title}
																				</h2>
																				<p className="text-sm block font-bold text-primary/80">
																					$ {cart.Product.discountPrice}
																				</p>
																				<div className="mt-1 flex justify-start items-center">
																					{JSON.parse(cart?.colors) && (
																						<>
																							<span className="font-semibold text-sm mr-4">
																								Color
																							</span>
																							<span
																								aria-hidden="true"
																								className={classNames(
																									JSON.parse(cart?.colors)?.class,
																									'block h-4 w-4 rounded-full border border-black'
																								)}
																							/>
																						</>
																					)}
																				</div>
																			</div>
																			<div className="mt-4 flex justify-between flex-col sm:mt-0">
																				<div className="flex items-center flex-row border-gray-100">
																					<button
																						className="bg-secondary hover:bg-primary/90 pt-[2px] pb-[6px] px-[10px] rounded-l-lg font-bold text-white text-sm"
																						onClick={(e) => handleQuantity(e, cart, 'dec')}
																					>
																						-
																					</button>
																					<span className="pt-[5px] pb-[4px] px-[10px] text-xs h-full text-primary border border-primary">
																						{cart.quantity}
																					</span>
																					<button
																						className="bg-secondary hover:bg-primary/90 pt-[2px] pb-[6px] px-[8px] rounded-r-lg font-bold text-white text-sm"
																						onClick={(e) => handleQuantity(e, cart)}
																					>
																						+
																					</button>
																				</div>
																			</div>
																			<RiDeleteBin5Line
																				className="ml-6 h-11 w-11 cursor-pointer duration-150 hover:text-red-500"
																				onClick={() => {
																					dispatch(DeleteFromCartAsync(cart.id))
																				}}
																			/>
																		</div>
																	</div>
																)}
															</Menu.Item>
														)
													})}
												</div>

												<div className="mx-0 w-full border-b-2 border-primary opacity-25"></div>
												<Menu.Item>
													{({ active }) => (
														<button
															onClick={() => {
																navigate('/carts/own')
															}}
															className={`${
																active
																	? 'bg-primary text-white'
																	: 'text-primary dark:hover:text-white'
															} font-semibold flex w-full items-center rounded-md p-2 justify-center text-sm`}
														>
															Show all
														</button>
													)}
												</Menu.Item>
											</div>
										</Menu.Items>
									</Transition>
								</Menu>
							</>
						</div>
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
															onClick={() => {
																navigate('/orders/own')
															}}
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
