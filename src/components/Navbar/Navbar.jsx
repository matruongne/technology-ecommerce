import { FaCaretDown, FaCartShopping, FaCircleUser } from 'react-icons/fa6'
import DarkMode from './DarkMode'
import Search from '../Search/Search'
import { useState } from 'react'

const MenuLinks = [
	{
		id: 1,
		name: 'Home',
		link: '/#',
	},
	{
		id: 2,
		name: 'Shop',
		link: '/#shop',
	},
	{
		id: 3,
		name: 'About',
		link: '/#about',
	},
	{
		id: 4,
		name: 'Blogs',
		link: '/#blog',
	},
	{
		id: 5,
		name: 'Link',
		link: '/#link',
		// DropdownLinks: [
		// 	{
		// 		id: 1,
		// 		name: 'Trending Products',
		// 		link: '/#',
		// 	},
		// 	{
		// 		id: 2,
		// 		name: 'Best Selling',
		// 		link: '/#',
		// 	},
		// 	{
		// 		id: 3,
		// 		name: 'Top Rated',
		// 		link: '/#',
		// 	},
		// ],
	},
]
const Navbar = ({ handleOrderPopup }) => {
	const [user, setUser] = useState(null)
	return (
		<div className="bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
			<div className="py-4">
				<div className="container flex justify-between items-center">
					{/* Logo and Links section */}
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="text-primary font-semibold tracking-widest text-2xl uppercase sm:text-3xl
"
						>
							Eshop
						</a>
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
											{data.name}
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
						<button className="relative p-3" onClick={handleOrderPopup}>
							<FaCartShopping className="cursor-pointer text-xl text-gray-600 dark:text-gray-400" />
							<div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
								4
							</div>
						</button>
						{user && (
							<FaCircleUser className="cursor-pointer text-3xl text-gray-600 dark:text-gray-400" />
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
