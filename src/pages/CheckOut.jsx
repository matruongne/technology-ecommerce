import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { getCartByUserAsync, selectAllCarts } from '../redux/Slices/Cart/cartSlice'
import { GiTechnoHeart } from 'react-icons/gi'
import classNames from 'classnames'
import { RadioGroup } from '@headlessui/react'
import { createOrderAsync, selectCurrentOrder } from './../redux/Slices/Order/orderSlice'
import { Navigate, useNavigate } from 'react-router-dom'

const CheckOut = () => {
	const [paymentMethod, setPaymentMethod] = useState('')
	const [addresses, setAddresses] = useState('')
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [pinCode, setPinCode] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [name, setName] = useState('')

	const userInfo = useSelector(selectUserInfo)
	const carts = useSelector(selectAllCarts)
	const currentOrder = useSelector(selectCurrentOrder)

	const dispatch = useDispatch()
	const navigate = useNavigate()
	useEffect(() => {
		dispatch(getCartByUserAsync()).then((result) => {
			!result.payload.length > 0 && navigate('/')
		})
	}, [dispatch])

	const totalAmount = carts.reduce(
		(amount, item) => item.Product.discountPrice * item.quantity + amount,
		0
	)
	const totalItems = carts.reduce((total, item) => item.quantity + total, 0)

	const handleOrder = () => {
		let sendInfo = null
		const orderDetails = carts.map((cart) => ({
			ProductId: cart.Product.id,
			quantity: cart.quantity,
			color: JSON.parse(cart?.colors)?.name,
		}))
		if (!addresses) {
			const address = {
				name,
				email,
				phone,
				street,
				city,
				state,
				pinCode,
			}
			sendInfo = {
				totalAmount,
				totalItems,
				paymentMethod,
				selectedAddress: { ...address },
				status: 'pending',
				orderDetails,
			}
		} else {
			sendInfo = {
				totalAmount,
				totalItems,
				paymentMethod,
				selectedAddress: { name, email, phone, ...addresses },
				status: 'pending',
				orderDetails,
			}
		}
		if (sendInfo) {
			dispatch(createOrderAsync(sendInfo))
		}
	}

	return (
		<div>
			{currentOrder?.order?.paymentMethod && (
				<Navigate to={`/order-success/${currentOrder?.order?.id}`} replace={true}></Navigate>
			)}
			<Navbar userInfo={userInfo} />
			<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mt-12">
				<div className="px-4 pt-8">
					<p className="text-xl font-medium">Order Summary</p>
					<p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
					<div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6 max-h-[610px] overflow-y-auto">
						{carts?.map((cart, index) => (
							<div key={index}>
								<div className="flex flex-col items-center rounded-lg bg-white sm:flex-row">
									{cart.Product?.thumbnail ? (
										<img
											src={cart.Product.thumbnail}
											alt={cart.Product.title}
											className="m-2 h-24 w-32 rounded-md border object-cover object-center"
										/>
									) : (
										<GiTechnoHeart className="m-2 h-24 w-28 rounded-md border object-cover object-center" />
									)}
									<div className="flex w-full flex-col px-4 py-4">
										<span className="font-semibold text-xl">{cart.Product.title}</span>
										<span className="flex flex-row justify-start items-center my-2">
											{JSON.parse(cart?.colors) && (
												<>
													<span className="font-semibold mr-4">Color</span>
													<span
														aria-hidden="true"
														className={classNames(
															JSON.parse(cart?.colors)?.class,
															'block h-4 w-4 rounded-full border border-black'
														)}
													/>
												</>
											)}
										</span>
										<p className="text-base block font-semibold text-gray-800">
											${cart.Product.discountPrice}
										</p>
									</div>

									<span className="min-w-20 text-lg text-gray-800">
										<span className="text-primary">{cart.quantity}</span>{' '}
										{cart.quantity > 1 ? 'items' : 'item'}
									</span>
								</div>
								{index !== carts.length - 1 && (
									<div className="mx-auto w-full border-b-2 border-primary opacity-25"></div>
								)}
							</div>
						))}
					</div>

					<p className="mt-8 text-lg font-medium">Payment Methods</p>
					<div className="mt-5 grid gap-6">
						<RadioGroup value={paymentMethod} onChange={setPaymentMethod}>
							<RadioGroup.Option value="cash" className={'mb-4'}>
								{({ checked }) => (
									<div className="relative">
										<input
											type="radio"
											className="hidden"
											value="cash"
											id="radio_1"
											checked={checked}
											onChange={() => setPaymentMethod('cash')}
										/>
										<div
											className={`peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white ${
												checked ? 'border-primary' : ''
											}`}
										></div>
										<label
											className={`peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${
												checked ? 'border-primary bg-gray-50' : ''
											}`}
											htmlFor="radio_1"
										>
											<div className="ml-5">
												<span className="mt-2 font-semibold">Cash Payment</span>
												<p className="text-slate-500 text-sm leading-6">
													Please prepare the exact amount as we may not provide change.
												</p>
											</div>
										</label>
									</div>
								)}
							</RadioGroup.Option>
							<RadioGroup.Option value="card">
								{({ checked }) => (
									<div className="relative">
										<input
											type="radio"
											className="hidden"
											value="card"
											id="radio_2"
											checked={checked}
											onChange={() => setPaymentMethod('card')}
										/>
										<div
											className={`peer-checked:border-primary absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white ${
												checked ? 'border-primary' : ''
											}`}
										></div>
										<label
											className={`peer-checked:border-2 peer-checked:border-primary peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 ${
												checked ? 'border-primary bg-gray-50' : ''
											}`}
											htmlFor="radio_2"
										>
											<div className="ml-5">
												<span className="mt-2 font-semibold">Card Payment</span>
												<p className="text-slate-500 text-sm leading-6">
													Make sure your card is eligible for online transactions.
												</p>
											</div>
										</label>
									</div>
								)}
							</RadioGroup.Option>
						</RadioGroup>
					</div>
				</div>
				<div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
					{userInfo?.addresses ? (
						<>
							<form className="mt-5 grid gap-6">
								<span className="font-semibold text-xl mb-2">Your Addresses:</span>

								{JSON.parse(userInfo.addresses).map((address, index) => (
									<div className="relative" key={index}>
										<input
											className="peer hidden"
											id={'radio_address_' + index}
											type="radio"
											name="radio"
											value={JSON.stringify(address)}
											onClick={(e) => {
												setAddresses(JSON.parse(e.target.value))
											}}
										/>
										<span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
										<label
											className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
											htmlFor={'radio_address_' + index}
										>
											<span className="mt-2 font-semibold">
												<span>
													{address.street},{address.city},{address.state},{address.pinCode}
												</span>
											</span>
										</label>
									</div>
								))}
							</form>
						</>
					) : (
						<div className="gap-4 grid grid-flow-row">
							<span className="font-semibold text-xl mb-2">Add your Addresses:</span>

							<div className="w-full">
								<label className="relative cursor-pointer">
									<input
										type="text"
										placeholder="Street"
										value={street}
										onChange={(e) => setStreet(e.target.value)}
										className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
									/>
									<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
										Street
									</span>
								</label>
							</div>
							<div className="w-full">
								<label className="relative cursor-pointer">
									<input
										type="text"
										placeholder="City"
										value={city}
										onChange={(e) => setCity(e.target.value)}
										className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
									/>
									<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
										City
									</span>
								</label>
							</div>
							<div className="w-full">
								<label className="relative cursor-pointer">
									<input
										type="text"
										placeholder="State"
										value={state}
										onChange={(e) => setState(e.target.value)}
										className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
									/>
									<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
										State
									</span>
								</label>
							</div>
							<div className="w-full">
								<label className="relative cursor-pointer">
									<input
										type="text"
										placeholder="PinCode"
										value={pinCode}
										onChange={(e) => setPinCode(e.target.value)}
										className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
									/>
									<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
										PinCode
									</span>
								</label>
							</div>
						</div>
					)}
					<div className="grid grid-flow-row gap-4 mt-6">
						<div className="w-full">
							<label className="relative cursor-pointer">
								<input
									type="text"
									placeholder="Name"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
								/>
								<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
									Name
								</span>
							</label>
						</div>
						<div className="w-full">
							<label className="relative cursor-pointer">
								<input
									type="text"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
								/>
								<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
									Email
								</span>
							</label>
						</div>
						<div className="w-full mb-6">
							<label className="relative cursor-pointer">
								<input
									type="text"
									placeholder="PhoneNumber"
									value={phone}
									onChange={(e) => setPhone(e.target.value)}
									className="px-6 w-full text-xl text-gray-800 border rounded-lg border-opacity-50 outline-none focus:ring-primary border-gray-900 placeholder-gray-300 placeholder-opacity-0 transition duration-200"
								/>
								<span className="text-lg bg-white text-gray-800 text-opacity-80 absolute left-5 -bottom-[1px] px-1 transition duration-200 input-text">
									Phone
								</span>
							</label>
						</div>
					</div>
					{paymentMethod === 'card' && (
						<>
							<p className="text-xl font-medium">Payment Details</p>
							<p className="text-gray-400">
								Complete your order by providing your payment details.
							</p>
							<div className="">
								<label htmlFor="card-holder" className="mt-4 mb-2 block text-sm font-medium">
									Card Holder
								</label>
								<div className="relative">
									<input
										type="text"
										id="card-holder"
										name="card-holder"
										className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
										placeholder="Your full name here"
									/>
									<div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-4 w-4 text-gray-400"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
											/>
										</svg>
									</div>
								</div>
								<label htmlFor="card-no" className="mt-4 mb-2 block text-sm font-medium">
									Card Details
								</label>
								<div className="flex">
									<div className="relative w-7/12 flex-shrink-0">
										<input
											type="text"
											id="card-no"
											name="card-no"
											className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
											placeholder="xxxx-xxxx-xxxx-xxxx"
										/>
										<div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
											<svg
												className="h-4 w-4 text-gray-400"
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												fill="currentColor"
												viewBox="0 0 16 16"
											>
												<path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
												<path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
											</svg>
										</div>
									</div>
									<input
										type="text"
										name="credit-expiry"
										className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
										placeholder="MM/YY"
									/>
									<input
										type="text"
										name="credit-cvc"
										className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
										placeholder="CVC"
									/>
								</div>
							</div>
						</>
					)}
					<div className="mt-6 border-t border-b py-2">
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-gray-900">Subtotal</p>
							<p className="font-semibold text-gray-900">${totalAmount}</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-gray-900">Total Items in Cart</p>
							<p className="font-semibold text-gray-900">{totalItems} Items</p>
						</div>
						<div className="flex items-center justify-between">
							<p className="text-sm font-medium text-gray-900">Shipping</p>
							<p className="font-semibold text-gray-900">$0.00</p>
						</div>
					</div>
					<div className="mt-6 flex items-center justify-between">
						<p className="text-sm font-medium text-gray-900">Total</p>
						<p className="text-2xl font-semibold text-gray-900">$ {totalAmount}</p>
					</div>
					<button
						className="mt-4 mb-8 w-full rounded-md bg-primary/90 hover:bg-primary px-6 py-3 font-medium text-white"
						onClick={() => handleOrder()}
					>
						Place Order
					</button>
				</div>
			</div>
		</div>
	)
}

export default CheckOut
