import React from 'react'
import Navbar from '../components/Navbar/Navbar'

import AOS from 'aos'
import 'aos/dist/aos.css'
import Hero from '../components/Hero/Hero'
import Category from '../components/Category/Category'
import Services from '../components/Services/Services'
import Banner from '../components/Banner/Banner'
import { BannerData, BannerData2 } from '../data/constants'
import Blogs from '../components/Blog/BlogInHome'

const Home = () => {
	React.useEffect(() => {
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
			<Navbar />
			<Hero />
			<Category />
			<Services />
			<Banner data={BannerData} />
			<Banner data={BannerData2} />
			<Blogs />
		</div>
	)
}

export default Home
