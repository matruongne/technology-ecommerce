import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
	getAllOrdersAsync,
	selectOrders,
	selectTotalOrders,
	updateOrderAsync,
} from '../redux/Slices/Order/orderSlice'
import { ITEMS_PER_PAGE } from '../data/constants'
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md'
import { FaEye } from 'react-icons/fa6'
import { FaPencilAlt } from 'react-icons/fa'
import Pagination from '../components/Pagination/Pagination'
import { Link } from 'react-router-dom'

function AdminOrders() {
	const [page, setPage] = useState(1)

	const dispatch = useDispatch()

	const orders = useSelector(selectOrders)
	const totalOrders = useSelector(selectTotalOrders)
	const [editableOrderId, setEditableOrderId] = useState(-1)
	const [sort, setSort] = useState({})

	console.log(orders, totalOrders)

	const handleEdit = (order) => {
		setEditableOrderId(order.id)
	}
	const handleShow = () => {
		console.log('handleShow')
	}

	const handleOrderStatus = (e, order) => {
		const updatedOrder = { id: order.id, status: e.target.value }
		dispatch(updateOrderAsync(updatedOrder))
		setEditableOrderId(-1)
	}

	const handleOrderPaymentStatus = (e, order) => {
		const updatedOrder = { id: order.id, paymentStatus: e.target.value }
		dispatch(updateOrderAsync(updatedOrder))
		setEditableOrderId(-1)
	}

	const handlePage = (page) => {
		setPage(page)
	}

	const handleSort = (sortOption) => {
		const sort = { _sort: sortOption.sort, _order: sortOption.order }
		console.log({ sort })
		setSort(sort)
	}

	const chooseColor = (status) => {
		switch (status) {
			case 'pending':
				return 'bg-purple-200 text-purple-600'
			case 'dispatched':
				return 'bg-yellow-200 text-yellow-600'
			case 'delivered':
				return 'bg-green-200 text-green-600'
			case 'received':
				return 'bg-green-200 text-green-600'
			case 'cancelled':
				return 'bg-red-200 text-red-600'
			default:
				return 'bg-purple-200 text-purple-600'
		}
	}

	useEffect(() => {
		const pagination = { _page: page, _limit: ITEMS_PER_PAGE }
		dispatch(getAllOrdersAsync({ sort, pagination }))
	}, [dispatch, page, sort])

	return (
		<div className="px-6 overflow-x-auto">
			<div className="text-xl font-bold text-gray-600 w-full gap-6 p-6 flex">
				<Link to="/admin" className="hover:text-primary">
					Home
				</Link>
				<Link to="/admin/orders" className="hover:text-primary">
					Order
				</Link>
			</div>
			<div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
				<div className="w-full">
					<div className="bg-white shadow-md rounded my-6">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
									<th
										className="py-3 px-0 text-left cursor-pointer"
										onClick={(e) =>
											handleSort({
												sort: 'id',
												order: sort?._order === 'asc' ? 'desc' : 'asc',
											})
										}
									>
										Order#{' '}
										{sort._sort === 'id' &&
											(sort._order === 'asc' ? (
												<MdOutlineKeyboardArrowUp className="w-4 h-4 inline"></MdOutlineKeyboardArrowUp>
											) : (
												<MdOutlineKeyboardArrowDown className="w-4 h-4 inline"></MdOutlineKeyboardArrowDown>
											))}
									</th>
									<th className="py-3 px-0 text-left">Items</th>
									<th
										className="py-3 px-0 text-left cursor-pointer"
										onClick={(e) =>
											handleSort({
												sort: 'totalAmount',
												order: sort?._order === 'asc' ? 'desc' : 'asc',
											})
										}
									>
										Total Amount{' '}
										{sort._sort === 'totalAmount' &&
											(sort._order === 'asc' ? (
												<MdOutlineKeyboardArrowUp className="w-4 h-4 inline"></MdOutlineKeyboardArrowUp>
											) : (
												<MdOutlineKeyboardArrowDown className="w-4 h-4 inline"></MdOutlineKeyboardArrowDown>
											))}
									</th>
									<th className="py-3 px-0 text-center">Shipping Address</th>
									<th className="py-3 px-0 text-center">Order Status</th>
									<th className="py-3 px-0 text-center">Payment Method</th>
									<th className="py-3 px-0 text-center">Payment Status</th>
									<th
										className="py-3 px-0 text-left cursor-pointer"
										onClick={(e) =>
											handleSort({
												sort: 'createdAt',
												order: sort?._order === 'asc' ? 'desc' : 'asc',
											})
										}
									>
										Order Time{' '}
										{sort._sort === 'createdAt' &&
											(sort._order === 'asc' ? (
												<MdOutlineKeyboardArrowUp className="w-4 h-4 inline"></MdOutlineKeyboardArrowUp>
											) : (
												<MdOutlineKeyboardArrowDown className="w-4 h-4 inline"></MdOutlineKeyboardArrowDown>
											))}
									</th>
									<th
										className="py-3 px-0 text-left cursor-pointer"
										onClick={(e) =>
											handleSort({
												sort: 'updatedAt',
												order: sort?._order === 'asc' ? 'desc' : 'asc',
											})
										}
									>
										Last Updated{' '}
										{sort._sort === 'updatedAt' &&
											(sort._order === 'asc' ? (
												<MdOutlineKeyboardArrowUp className="w-4 h-4 inline"></MdOutlineKeyboardArrowUp>
											) : (
												<MdOutlineKeyboardArrowDown className="w-4 h-4 inline"></MdOutlineKeyboardArrowDown>
											))}
									</th>
									<th className="py-3 px-0 text-center">Actions</th>
								</tr>
							</thead>
							<tbody className="text-gray-600 text-sm font-light">
								{orders?.map((order) => (
									<tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
										<td className="py-3 px-0 text-left whitespace-nowrap">
											<div className="flex items-center">
												<div className="mr-2"></div>
												<span className="font-medium">{order.id}</span>
											</div>
										</td>
										<td className="py-3 px-0 text-left">{totalOrders}</td>
										<td className="py-3 px-0 text-center">
											<div className="flex items-center justify-center">${order.totalAmount}</div>
										</td>
										<td className="py-3 px-0 text-center">
											<div className="">
												<div>
													<strong>{JSON.parse(order.selectedAddress).name}</strong>,
												</div>
												<div>{JSON.parse(order.selectedAddress).street},</div>
												<div>{JSON.parse(order.selectedAddress).city}, </div>
												<div>{JSON.parse(order.selectedAddress).state}, </div>
												<div>{JSON.parse(order.selectedAddress).pinCode}, </div>
												<div>{JSON.parse(order.selectedAddress).phone}, </div>
											</div>
										</td>
										<td className="py-3 px-0 text-center">
											{order.id === editableOrderId ? (
												<select onChange={(e) => handleOrderStatus(e, order)}>
													<option value="pending">Pending</option>
													<option value="dispatched">Dispatched</option>
													<option value="delivered">Delivered</option>
													<option value="cancelled">Cancelled</option>
												</select>
											) : (
												<span
													className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}
												>
													{order.status}
												</span>
											)}
										</td>

										<td className="py-3 px-0 text-center">
											<div className="flex items-center justify-center">{order.paymentMethod}</div>
										</td>

										<td className="py-3 px-0 text-center">
											{order.id === editableOrderId ? (
												<select onChange={(e) => handleOrderPaymentStatus(e, order)}>
													<option value="pending">Pending</option>
													<option value="received">Received</option>
												</select>
											) : (
												<span
													className={`${chooseColor(
														order.paymentStatus
													)} py-1 px-3 rounded-full text-xs`}
												>
													{order.paymentStatus}
												</span>
											)}
										</td>

										<td className="py-3 px-0 text-center">
											<div className="flex items-center justify-center">
												{order.createdAt ? new Date(order.createdAt).toLocaleString() : null}
											</div>
										</td>

										<td className="py-3 px-0 text-center">
											<div className="flex items-center justify-center">
												{order.updatedAt ? new Date(order.updatedAt).toLocaleString() : null}
											</div>
										</td>

										<td className="py-3 px-0 text-center">
											<div className="flex item-center justify-center">
												<div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
													<FaEye className="w-8 h-8" onClick={(e) => handleShow(order)}></FaEye>
												</div>
												<div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
													<FaPencilAlt
														className="w-8 h-8"
														onClick={(e) => handleEdit(order)}
													></FaPencilAlt>
												</div>
											</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<Pagination
				page={page}
				setPage={setPage}
				handlePage={handlePage}
				totalItems={totalOrders}
			></Pagination>
		</div>
	)
}

export default AdminOrders
