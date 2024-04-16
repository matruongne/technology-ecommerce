import React, { useEffect } from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { useNavigate } from 'react-router-dom'
import { getOrdersByUserAsync } from '../redux/Slices/Order/orderSlice'
import { selectAllOrders } from './../redux/Slices/Order/orderSlice'
import { format } from 'date-fns'

const Order = () => {
	const userInfo = useSelector(selectUserInfo)
	const orders = useSelector(selectAllOrders)

	const dispatch = useDispatch()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getOrdersByUserAsync())
	}, [dispatch])

	return (
		<div>
			<Navbar userInfo={userInfo} />
			<div className="container h-screen bg-gray-100 pt-20">
				<div className="flex flex-col items-center justify-center">
					<h1 className="mb-4 text-center text-4xl font-bold">My Orders</h1>
					<span className="text-gray-600 text-lg">
						Check the status of recent orders, manage returns, and discover similar products.
					</span>
				</div>
				<div className="mx-auto justify-center px-6 flex">
					<div className="rounded-lg w-full max-h-[740px] overflow-y-auto">
						{orders?.result?.map((order, index) => (
							<div key={index} className="my-4 p-8 mx-auto bg-white rounded-xl shadow-md">
								<div className="flex items-center justify-between mb-6">
									<h2 className="text-lg font-semibold text-gray-800">
										Order<span className="text-gray-600 font-bold"> #{order.id}</span>
									</h2>
									<p className="text-lg text-gray-800 font-semibold">
										Ordered on{' '}
										<span className="text-gray-600 font-bold">
											{format(order.createdAt, 'EEEE d MMMM, yyyy')}
										</span>
									</p>
									<div className="text-lg text-gray-800 font-semibold">
										<div className="text-lg text-gray-800 font-semibold">
											Total Items:{' '}
											<span className="text-gray-600 font-bold">{order.totalItems} items</span>
										</div>
										Total Amount:{' '}
										<span className="text-gray-600 font-bold">${order.totalAmount}</span>
									</div>
								</div>
								<div className="flex mb-6 p-4 border border-gray-200">
									<div className="flex items-center w-full justify-between flex-row">
										<div className="flex items-start justify-center flex-col">
											<span className="font-bold">Customer’s</span>
											<span>{JSON.parse(order.selectedAddress).name}</span>
											<span>{JSON.parse(order.selectedAddress).email}</span>
											<span>{JSON.parse(order.selectedAddress).phone}</span>
										</div>
										<div className="flex items-start justify-center flex-col font-bold">
											<span>Status: {order.status}</span>
										</div>
										<div className="flex items-start justify-center flex-col">
											<span className="font-bold">Shipping Address</span>
											<span>
												{JSON.parse(order.selectedAddress).street},
												{JSON.parse(order.selectedAddress).city},
												{JSON.parse(order.selectedAddress).state}.
											</span>
											<span>Pin code: {JSON.parse(order.selectedAddress).pinCode}</span>
										</div>
									</div>
								</div>

								<div className="flex justify-end items-center">
									<a
										href="#"
										className="flex items-center py-2 px-6 bg-primary/90 hover:bg-primary/80 text-white rounded"
									>
										<button
											onClick={() => navigate('/orders/' + order.id)}
											className="text-lg font-bold"
										>
											View Details
										</button>
									</a>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Order
