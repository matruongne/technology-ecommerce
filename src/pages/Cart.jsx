import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { useNavigate } from 'react-router-dom'
import {
	DeleteFromCartAsync,
	getCartByUserAsync,
	selectAllCarts,
} from '../redux/Slices/Cart/cartSlice'
import { updateCartAsync } from './../redux/Slices/Cart/cartSlice'
import classNames from 'classnames'
import { GiTechnoHeart } from 'react-icons/gi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { IoIosReturnLeft } from 'react-icons/io'

const Cart = () => {
	const userInfo = useSelector(selectUserInfo)
	const carts = useSelector(selectAllCarts)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getCartByUserAsync())
	}, [dispatch])

	const totalAmount = carts.reduce(
		(amount, item) => item.Product.discountPrice * item.quantity + amount,
		0
	)
	const totalItems = carts.reduce((total, item) => item.quantity + total, 0)

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
		<div>
			<Navbar userInfo={userInfo} />
			<div className="h-screen bg-gray-100 pt-20">
				<h1 className="mb-10 text-center text-4xl font-bold">My Carts</h1>
				<div className="mx-auto max-w-6xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
					<div className="rounded-lg md:w-2/3 max-h-[800px] overflow-y-auto">
						{carts?.map((cart, index) => (
							<div
								key={index}
								className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
							>
								{cart.Product?.thumbnail ? (
									<img
										src={cart.Product.thumbnail}
										alt={cart.Product.title}
										className="w-full rounded-lg sm:w-48 sm:h-32 object-cover object-center"
									/>
								) : (
									<GiTechnoHeart className="w-full rounded-lg sm:w-40 object-cover object-center" />
								)}
								<div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
									<div className="mt-5 sm:mt-0 w-full">
										<h2 className="text-2xl font-bold text-gray-900">{cart.Product.title}</h2>
										<div className="mt-4 flex justify-start items-center">
											{JSON.parse(cart?.colors) && (
												<>
													<span className="font-semibold mr-4">Color</span>
													<span
														aria-hidden="true"
														className={classNames(
															JSON.parse(cart?.colors)?.class,
															'block h-8 w-8 rounded-full border border-black'
														)}
													/>
												</>
											)}
										</div>
									</div>
									<div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
										<div className="flex items-center border-gray-100">
											<button
												className="bg-secondary hover:bg-primary/90 py-1 px-4 rounded-l-lg font-bold text-white text-3xl"
												onClick={(e) => handleQuantity(e, cart, 'dec')}
											>
												-
											</button>
											<span className="py-1 px-4 text-2xl h-full text-primary border border-primary">
												{cart.quantity}
											</span>
											<button
												className="bg-secondary hover:bg-primary/90 py-1 px-3 rounded-r-lg font-bold text-white text-3xl"
												onClick={(e) => handleQuantity(e, cart)}
											>
												+
											</button>
										</div>
										<div className="flex items-center space-x-4">
											<div className="flex items-center justify-between flex-col">
												<p className="text-base block font-bold text-primary">
													{cart.Product.discountPrice}
												</p>
												<p className="text-sm block line-through font-medium text-gray-400 mt-1">
													{cart.Product.price}
												</p>
											</div>
											<RiDeleteBin5Line
												className="h-8 w-8 cursor-pointer duration-150 hover:text-red-500"
												onClick={() => {
													dispatch(DeleteFromCartAsync(cart.id))
												}}
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
					<div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
						<div className="mb-2 flex justify-between">
							<p className="text-gray-700">Subtotal</p>
							<p className="text-gray-700">$ {totalAmount}</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Total Items in Cart</p>
							<p className="text-gray-700">{totalItems} Items</p>
						</div>
						<div className="flex justify-between">
							<p className="text-gray-700">Shiping</p>
							<p className="text-gray-700">$4.99</p>
						</div>
						<hr className="my-4" />
						<div className="flex justify-between">
							<p className="text-lg font-bold">Total</p>
							<div className="">
								<p className="mb-1 text-lg font-bold">$ {totalAmount} USD</p>
								<p className="text-sm text-gray-700">including VAT</p>
							</div>
						</div>
						<div className="grid grid-flow-row grid-cols-5 gap-3">
							<button
								className="flex flex-row items-center justify-center mt-6 w-full col-span-2 rounded-md bg-gray-400 p-2 font-medium text-gray-100 hover:bg-blue-500"
								onClick={() => navigate('/shops')}
							>
								<IoIosReturnLeft className="mr-1 text-lg" />
								Shopping
							</button>
							<button
								className="mt-6 w-full col-span-3 rounded-md bg-secondary p-2 font-semibold text-blue-50 hover:bg-primary"
								onClick={() => navigate('/checkout')}
							>
								Check out
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
