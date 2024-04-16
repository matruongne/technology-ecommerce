import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from '../components/Hero/Hero'
import Category from '../components/Category/Category'
import Services from '../components/Services/Services'
import Banner from '../components/Banner/Banner'
import { BannerData, HeroData, ITEMS_PER_PAGE, ServiceData } from '../data/constants'
import Blogs from '../components/Blog/BlogInHome'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { getAllPostAsync } from '../redux/Slices/Posts/postSlice'
import { getProductsByFiltersAsync, selectAllProducts } from '../redux/Slices/Product/productSlice'
import Category2 from '../components/Category/Category2'
import Chat from './Chat'

const Home = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)
	const products = useSelector(selectAllProducts)

	const [posts, setPosts] = useState(null)
	useEffect(() => {
		const pagination = { _page: 1, _limit: ITEMS_PER_PAGE }

		dispatch(getAllPostAsync()).then((result) => setPosts(result.payload))

		dispatch(getProductsByFiltersAsync({ pagination }))
	}, [dispatch])

	useEffect(() => {
		AOS.init({
			duration: 800,
			easing: 'ease-in-sine',
			delay: 100,
			offset: 100,
		})
		AOS.refresh()
	}, [])

	return (
		<div className="relative bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden h-full">
			<Navbar userInfo={userInfo} />
			<Hero HeroData={HeroData} />
			<Category />
			<div className="container">
				<div className="text-center mb-10 max-w-[600px] mx-auto space-y-2">
					<h1 className="text-3xl font-bold">New Products</h1>
					<p className="text-base text-gray-400">
						Introducing Our Latest Innovations: Explore Our New Product Lineup!
					</p>
				</div>
				<Category2 data={products} />
			</div>
			<Services ServiceData={ServiceData} />
			<Banner data={BannerData} />
			<div className="fixed bottom-0 right-0 z-[9999]">
				<Chat />
			</div>
			{posts && posts.posts.length > 0 ? <Blogs posts={posts} /> : ''}
		</div>
	)
}

export default Home
