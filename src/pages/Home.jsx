import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar/Navbar'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from '../components/Hero/Hero'
import Category from '../components/Category/Category'
import Services from '../components/Services/Services'
import Banner from '../components/Banner/Banner'
import { BannerData } from '../data/constants'
import Blogs from '../components/Blog/BlogInHome'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { getAllPostAsync } from '../redux/Slices/Posts/postSlice'

const Home = () => {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)
	const [posts, setPosts] = useState(null)
	useEffect(() => {
		dispatch(getAllPostAsync()).then((result) => setPosts(result.payload))
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
		<div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden h-full">
			<Navbar userInfo={userInfo} />
			<Hero />
			<Category />
			<Services />
			<Banner data={BannerData} />
			{posts && posts.posts.length > 0 ? <Blogs posts={posts} /> : ''}
		</div>
	)
}

export default Home
