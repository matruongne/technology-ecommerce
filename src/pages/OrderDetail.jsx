import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { getOrdersByIdAsync, selectOrderById } from '../redux/Slices/Order/orderSlice'
import Navbar from '../components/Navbar/Navbar'
import { format } from 'date-fns'
import { FaCircleUser } from 'react-icons/fa6'
import { GiTechnoHeart } from 'react-icons/gi'

const OrderDetail = () => {
	const { id } = useParams()
	const userInfo = useSelector(selectUserInfo)
	const order = useSelector(selectOrderById)?.result

	const dispatch = useDispatch()
	const navigate = useNavigate()

	console.log(order)
	useEffect(() => {
		dispatch(getOrdersByIdAsync(id))
	}, [dispatch, id])

	return (
		<div>
			<Navbar userInfo={userInfo} />
			{order && (
				<div className="container py-14 px-12">
					<div className="flex justify-start item-start space-y-2 flex-col">
						<h1 className="text-3xl font-semibold leading-7 lg:leading-9 text-gray-800">
							Order<span className="text-gray-600 font-bold"> #{order.id}</span>
						</h1>
						<p className="text-base dark:text-gray-500 font-medium leading-6 text-gray-600">
							{format(order.createdAt, 'EEEE d MMMM yyyy, HH:mm:ss')}
						</p>
					</div>
					<div className="mt-10 flex flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
						<div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
							<div className="flex flex-row justify-between items-center w-full">
								<p className="text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
									Customer’s Cart
								</p>
								<div className="text-lg text-gray-800 dark:text-gray-300 font-semibold">
									Total Items:{' '}
									<span className="text-gray-600 font-bold dark:text-gray-400">
										{order.totalItems} items
									</span>
								</div>
							</div>
							<div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-white px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full max-h-[670px] overflow-y-auto">
								{order.OrderItems?.map((item, index) => (
									<div
										key={index}
										className="mt-6 flex flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full"
									>
										{item.Product?.thumbnail ? (
											<img
												src={item.Product.thumbnail}
												alt={item.Product.title}
												className="w-full rounded-lg sm:w-44 sm:h-28 object-cover object-center"
											/>
										) : (
											<GiTechnoHeart className="w-full rounded-lg sm:w-24 sm:h-16 object-cover object-center" />
										)}
										<div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
											<div className="w-full flex flex-col justify-start items-start space-y-8">
												<h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
													{item?.Product.title}
												</h3>
												<div className="flex justify-start items-start flex-col space-y-2">
													<p className="text-sm dark:text-white leading-none text-gray-800">
														<span className="dark:text-gray-400 text-gray-700">Color: </span>
														{item?.color ? item?.color : 'none'}
													</p>
												</div>
											</div>
											<div className="flex justify-between space-x-8 items-start w-full">
												<p className="text-base dark:text-white xl:text-lg leading-6 font-semibold text-primary">
													${item.Product.discountPrice}{' '}
													<span className="text-base text-gray-600 line-through">
														{' '}
														${item.Product.price}
													</span>
												</p>
												<p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
													{item.quantity}
												</p>
												<p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
													${(item.Product.discountPrice * item.quantity).toFixed(2)}
												</p>
											</div>
										</div>
									</div>
								))}
							</div>
							<div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
								<div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-white dark:bg-gray-800 space-y-6">
									<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
										Summary
									</h3>
									<div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
										<div className="flex justify-between w-full">
											<p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
											<p className="text-base dark:text-gray-300 leading-4 text-gray-600">
												${order.totalAmount}
											</p>
										</div>
										<div className="flex justify-between items-center w-full">
											<p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
											<p className="text-base dark:text-gray-300 leading-4 text-gray-600">$0.00</p>
										</div>
									</div>
									<div className="flex justify-between items-center w-full">
										<p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
											Total
										</p>
										<p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
											${order.totalAmount}
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="bg-white dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col max-h-[500px]">
							<h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
								Customer
							</h3>
							<div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
								<div className="flex flex-col justify-start items-start flex-shrink-0">
									<div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
										{userInfo?.images ? (
											<img
												src={userInfo?.images.slice(1, userInfo.images.length - 1)}
												className="lg:rounded-full w-14 h-14 border-2 border-primary shadow-2xl hidden lg:block"
											/>
										) : (
											<FaCircleUser className="lg:rounded-full w-14 h-14 border-2 border-primary shadow-2xl hidden lg:block" />
										)}
										<div className="flex justify-start items-start flex-col space-y-2">
											<p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">
												<span>{JSON.parse(order.selectedAddress).name}</span>
											</p>
											<p className="text-sm dark:text-gray-300 leading-5 text-gray-600">
												<span>{JSON.parse(order.selectedAddress).phone}</span>
											</p>
										</div>
									</div>

									<div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
										<svg
											width="24"
											height="24"
											viewBox="0 0 24 24"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
											<path
												d="M3 7L12 13L21 7"
												stroke="currentColor"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<p className="cursor-pointer text-sm leading-5 ">
											<span>{JSON.parse(order.selectedAddress).email}</span>
										</p>
									</div>
								</div>
								<div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
									<div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
										<div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
											<p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
												Shipping Address
											</p>
											<p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
												{JSON.parse(order.selectedAddress).street},
												{JSON.parse(order.selectedAddress).city},
												{JSON.parse(order.selectedAddress).state}.
											</p>
										</div>
										<div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
											<p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
												Pin Code
											</p>
											<p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
												<span>{JSON.parse(order.selectedAddress).pinCode}</span>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default OrderDetail
