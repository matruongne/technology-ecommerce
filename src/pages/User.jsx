import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsUserAsync, selectUserInfo } from '../redux/Slices/User/userSlice'
import { updateUserAsync } from './../redux/Slices/User/userSlice'

import Navbar from '../components/Navbar/Navbar'
import Button from '../components/Button/Button'

import bg_user from '../assets/bg_user.jpeg'
import { MdOutlineVerifiedUser } from 'react-icons/md'
import { FaCircleUser, FaRegAddressBook } from 'react-icons/fa6'
import { BsPostcardFill } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { TbUserEdit } from 'react-icons/tb'

import HeadlessModal from '../components/Modals/HeadlessModal'
import ImagetoBase64 from './../utils/ImagetoBase64'
import { UploadImage } from './../components/Upload/UploadImage'

const User = () => {
	const userInfo = useSelector(selectUserInfo)
	const dispatch = useDispatch()

	const [open, setOpen] = useState(false)
	const [street, setStreet] = useState('')
	const [city, setCity] = useState('')
	const [state, setState] = useState('')
	const [pinCode, setPinCode] = useState('')
	const [posts, setPosts] = useState(null)
	const [addAddress, setAddAddress] = useState(false)
	const [editAddress, setEditAddress] = useState({})
	const [editUser, setEditUser] = useState(false)
	const [modalData, setModalData] = useState({})
	const [image, setImage] = useState('')
	const [name, setName] = useState('')
	const cancelButtonRef = useRef(null)
	const postsRef = useRef(null)

	const navigate = useNavigate()

	const handleUpdateUser = async () => {
		let update = {}

		if (addAddress) {
			if (!userInfo.addresses)
				update = {
					id: userInfo.id,
					addresses: [{ street, city, state, pinCode }],
				}
			else {
				const oldAddresses = JSON.parse(userInfo.addresses)

				update = {
					id: userInfo.id,
					addresses: [...oldAddresses, { street, city, state, pinCode }],
				}
			}
		} else if (editAddress) {
			let oldAddresses = JSON.parse(userInfo.addresses)
			oldAddresses[editAddress.index] = { street, city, state, pinCode }

			update = {
				id: userInfo.id,
				addresses: oldAddresses,
			}
		} else if (editUser) {
			const result = await UploadImage(image)
			if (result.data.secure_url)
				update = {
					id: userInfo.id,
					name: name === '' ? undefined : name,
					images: result.data.secure_url,
				}
		}

		dispatch(updateUserAsync(update)).then(() => window.location.reload())
	}

	const handleChangeImage = (e) => {
		e.preventDefault()
		const file = e.target.files?.[0]
		if (!file) {
			return
		}
		if (!file.type.includes('image')) {
			return alert('Please select an image file to display in the browser and try again')
		}

		ImagetoBase64(file).then((result) => {
			setImage(result)
		})
	}
	return (
		<>
			{userInfo ? (
				<>
					<div
						className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden h-full bg-[image:var(--image-url)]"
						style={{ '--image-url': `url(${bg_user})` }}
					>
						<HeadlessModal
							{...modalData}
							open={open}
							setOpen={setOpen}
							cancelButtonRef={cancelButtonRef}
							handle={handleUpdateUser}
						>
							{addAddress && (
								<>
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
								</>
							)}
							{editUser && (
								<>
									<div className="w-full">
										<span className="text-lg bg-white text-gray-800 text-opacity-80 px-1 pl-6 block pb-2">
											Avatar
										</span>
										<div className="flex items-center space-x-6">
											<div className="shrink-0">
												{image ? (
													<img
														id="preview_img"
														className="h-16 w-16 object-cover rounded-full"
														src={null || image}
														alt="Current profile photo"
													/>
												) : (
													<FaCircleUser className="h-16 w-16 object-cover rounded-full" />
												)}
											</div>
											<label className="block">
												<span className="sr-only">Choose profile photo</span>
												<input
													type="file"
													accept="image/*"
													onChange={handleChangeImage}
													className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
												/>
											</label>
										</div>
									</div>
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
								</>
							)}
							{editAddress && editAddress.address && (
								<>
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
								</>
							)}
						</HeadlessModal>
						<Navbar userInfo={userInfo} />
						<div className="container font-sans antialiased text-gray-900 dark:text-gray-100 leading-normal tracking-wider bg-cover">
							<div className="flex items-center justify-center h-auto lg:h-screen mx-auto">
								<div className="w-full rounded-lg lg:rounded-l-lg lg:rounded-r-lg shadow-2xl bg-white dark:bg-gray-900 opacity-75">
									<div className="p-4 md:p-12 text-center lg:text-left">
										<div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"></div>
										<h1 className="text-3xl font-bold pt-8 lg:pt-0 flex items-center pb-9">
											{userInfo.images ? (
												<img
													src={userInfo.images.slice(1, userInfo.images.length - 1)}
													className="lg:rounded-full w-28 h-28 border-4 border-primary shadow-2xl hidden lg:block"
												/>
											) : (
												<FaCircleUser className="lg:rounded-full w-28 h-28 border-4 border-primary shadow-2xl hidden lg:block" />
											)}
											<span className="pl-12">{userInfo.name || userInfo.email}</span>
											<button
												className="ml-2 p-1 rounded-full"
												onClick={() => {
													setOpen(!open)
													setEditUser(true)
													setAddAddress(false)
													setEditAddress(null)

													setModalData({
														handleUpdateUser,
														title: 'Edit your Account',
														subtitle: 'Manage Your Profile: Customizing Account Details',
														btnTitle: 'Edit',
														classNames: 'sm:max-w-lg',
													})
												}}
											>
												<TbUserEdit className="text-secondary hover:text-primary" />
											</button>
										</h1>
										<div className="mx-auto lg:mx-0 w-full pt-3 border-b-2 border-primary opacity-25"></div>
										<p className="py-4 text-xs lg:text-lg flex items-center justify-center lg:justify-start uppercase font-semibold">
											<MdOutlineVerifiedUser className="text-primary mr-4 text-2xl" />
											Role: {userInfo.role}
										</p>
										<div className="text-xs lg:text-lg flex items-start justify-center lg:justify-start">
											<FaRegAddressBook className="text-primary mr-4 text-2xl" />
											{userInfo.addresses ? (
												<>
													<span className="flex flex-col w-full">
														<span className="font-semibold mb-2">Your Addresses:</span>
														{JSON.parse(userInfo.addresses).map((address, index) => (
															<div className="flex mb-4 justify-between" key={index}>
																<div className="flex items-center justify-between">
																	<span className="bg-primary rounded-full px-[9px] mr-3 text-gray-100">
																		{index + 1}
																	</span>
																	<span>
																		{address.street},{address.city},{address.state},
																		{address.pinCode}
																	</span>
																</div>
																<Button
																	text={'Edit addresses'}
																	classNames={'ml-4 rounded-full bg-primary text-white p-2'}
																	handler={() => {
																		setOpen(!open)
																		setEditAddress({ address, index })
																		setEditUser(false)
																		setAddAddress(false)

																		setStreet(address.street)
																		setState(address.state)
																		setCity(address.city)
																		setPinCode(address.pinCode)

																		setModalData({
																			handleUpdateUser,
																			title: 'Edit your Address',
																			subtitle:
																				'Update Your Address: Keeping Your Information Current',
																			btnTitle: 'Edit',
																			classNames: 'sm:max-w-lg',
																		})
																	}}
																/>
															</div>
														))}
														<Button
															text={'Add addresses'}
															classNames={
																'rounded-full bg-primary text-white p-2 max-w-[135px] my-4'
															}
															handler={() => {
																setOpen(!open)
																setAddAddress(true)
																setEditAddress(null)
																setEditUser(false)

																setStreet('')
																setState('')
																setCity('')
																setPinCode('')
																setModalData({
																	handleUpdateUser,
																	title: 'Add new Addresses',
																	subtitle:
																		'Enter your delivery address to be able to receive the goods from the shipping unit.',
																	btnTitle: 'Add',
																	classNames: 'sm:max-w-lg',
																})
															}}
														/>
														<div className="mx-auto w-full border-b-2 border-primary opacity-25"></div>
													</span>
												</>
											) : (
												<Button
													text={'Add addresses'}
													classNames={'rounded-full bg-primary text-white p-2'}
													handler={() => {
														setOpen(!open)
														setAddAddress(true)
														setEditAddress(null)
														setEditUser(false)

														setModalData({
															handleUpdateUser,
															title: 'Add new Addresses',
															subtitle:
																'Enter your delivery address to be able to receive the goods from the shipping unit.',
															btnTitle: 'Add',
															classNames: 'sm:max-w-lg',
														})
													}}
												/>
											)}
										</div>
										<p className="pt-8 text-sm">
											Totally optional short description about yourself, what you do and so on.
										</p>

										<div className="pt-12 pb-8">
											<button
												className="bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-full"
												onClick={() => {
													if (postsRef && postsRef.current) {
														postsRef.current.scrollIntoView({ behavior: 'smooth' })
													}
													!posts &&
														dispatch(getPostsUserAsync()).then((result) => {
															setPosts(result.payload)
														})
												}}
											>
												My Posts
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div
						ref={postsRef}
						className="container font-sans antialiased text-gray-900 dark:text-gray-100 leading-normal tracking-wider bg-cover"
					>
						<h1 className="font-bold text-3xl pt-32">
							POSTS
							<div className="pt-2 mx-auto w-full border-b-2 border-primary opacity-25"></div>
						</h1>
						{posts && (
							<div className="grid grid-cols-3 gap-8">
								{posts.posts.map((post, index) => (
									<div
										key={index}
										className="cursor-pointer col-span-3 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 items-center relative flex max-w-[24rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-xl my-8"
										onClick={() => {
											navigate(`/blog/${post._id}`)
											window.scrollTo({
												top: 0,
												behavior: 'smooth',
											})
										}}
									>
										<div className="relative m-0 overflow-hidden rounded-none bg-transparent bg-clip-border text-gray-700 shadow-none">
											{post.images[0] ? (
												<img
													src={post.images[0]}
													alt={post.title}
													className="h-[250px] w-[380px] object-fit"
												/>
											) : (
												<BsPostcardFill className="w-full text-[250px]" />
											)}
										</div>
										<div className="p-6 w-full">
											<h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
												<div className="line-clamp-1">{post.title}</div>
											</h4>
											<div className="mt-3 block font-sans text-xl font-normal leading-relaxed text-gray-700 antialiased h-[65px]">
												<div className="line-clamp-2">{post.text}</div>
											</div>
										</div>
										<div className="flex items-center w-full px-6 pt-2">
											{userInfo.images ? (
												<img
													src={userInfo.images.slice(1, userInfo.images.length - 1)}
													className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10"
												/>
											) : (
												<FaCircleUser className="relative inline-block h-9 w-9 rounded-full border-2 border-white object-cover object-center hover:z-10" />
											)}
											<div className="mx-2">{userInfo.name || userInfo.email}</div>
										</div>
										<div className="flex items-center justify-end w-full px-6 pb-2">
											<p className="block font-sans text-base font-normal leading-relaxed text-inherit antialiased">
												{new Date(post.createdAt).toLocaleDateString('vi-VN')}
											</p>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				</>
			) : (
				'...loading'
			)}
		</>
	)
}

export default User
