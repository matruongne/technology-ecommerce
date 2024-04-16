import { FaCarSide, FaHeadphonesAlt, FaWallet, FaCheckCircle } from 'react-icons/fa'
import headphone from '../assets/Heros/headphone.png'
import Image1 from '../assets/Heros/headphone.png'
import Image2 from '../assets/Category/vr.png'
import Image3 from '../assets/Category/macbook.png'

const BannerData = {
	discount: '30% OFF',
	title: 'Fine Smile',
	date: '10 Jan to 28 Jan',
	image: headphone,
	title2: 'Air Solo Bass',
	title3: 'Winter Sale',
	title4:
		'Elevate Your Sound: Discover the Air Solo Bass Winter Sale! Unleash Your Musical Potential with Unbeatable Offers!',
	bgColor: '#f42c37',
}
const ITEMS_PER_PAGE = 3

const ServiceData = [
	{
		id: 1,
		icon: <FaCarSide className="text-4xl md:text-5xl text-primary" />,
		title: 'Free Shipping',
		description: 'Free Shipping On All Order',
	},
	{
		id: 2,
		icon: <FaCheckCircle className="text-4xl md:text-5xl text-primary" />,
		title: 'Safe Money ',
		description: '30 Days Money Back',
	},
	{
		id: 3,
		icon: <FaWallet className="text-4xl md:text-5xl text-primary" />,
		title: 'Secure Payment',
		description: 'All Payment Secure',
	},
	{
		id: 4,
		icon: <FaHeadphonesAlt className="text-4xl md:text-5xl text-primary" />,
		title: 'Online Supoort 24/7',
		description: 'Technical Support 24/7',
	},
]

const HeroData = [
	{
		id: 1,
		img: Image1,
		subtitle: 'Beats Solo',
		title: 'Wireless',
		title2: 'Headphone',
	},
	{
		id: 2,
		img: Image2,
		subtitle: 'Beats Solo',
		title: 'Wireless',
		title2: 'Virtual',
	},
	{
		id: 1,
		img: Image3,
		subtitle: 'Beats Solo',
		title: 'Branded',
		title2: 'Laptops',
	},
]

export { BannerData, ITEMS_PER_PAGE, ServiceData, HeroData }
