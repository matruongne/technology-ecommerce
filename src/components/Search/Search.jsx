import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { IoMdSearch, IoMdCloseCircle } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import HeadlessTippy from '@tippyjs/react/headless'

import useDebounce from '../../hooks/useDebounce'
import cx from 'classnames'
import axios from 'axios'
import { GiTechnoHeart } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const Search = () => {
	const [searchResult, setSearchResult] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [showResult, setShowResult] = useState(false)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const inputRef = useRef()

	const debounceValue = useDebounce(searchValue, 500)

	useEffect(() => {
		if (debounceValue.trim() === '') {
			setSearchResult([])
			return
		}

		const fetchApi = async () => {
			setLoading(true)

			const result = await axios.get(
				'http://localhost:3300/api/products/search?title=' + searchValue
			)

			setSearchResult(result.data)

			setLoading(false)
		}
		fetchApi()
	}, [debounceValue])

	const handleHideResult = () => {
		setShowResult(false)
	}
	return (
		<span>
			<HeadlessTippy
				interactive={true}
				onClickOutside={handleHideResult}
				visible={showResult}
				render={(attrs) => (
					<div
						className="z-[9999] divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-[400px] min-h-[100px] text-gray-800"
						tabIndex="-1"
						onMouseLeave={() => setShowResult(false)}
						{...attrs}
					>
						<div>
							<h4 className="text-center p-3 uppercase font-bold">Products</h4>
							<div className="max-h-[480px] overflow-y-auto">
								{searchResult.length > 0 ? (
									searchResult?.map((result, index) => {
										return (
											<button
												onClick={() => navigate('/category/' + result.id)}
												key={result.id}
												className="flex w-full cursor-pointer justify-between items-center p-4 hover:bg-gray-300 last:rounded-b-md"
											>
												<div className="flex gap-2">
													{result?.thumbnail ? (
														<img
															src={result.thumbnail}
															alt={result.title}
															className="h-14 w-[72px] rounded-md border object-cover object-center"
														/>
													) : (
														<GiTechnoHeart className="m-2 h-12 w-18 rounded-md border object-cover object-center" />
													)}
													<span className="text-lg font-semibold flex justify-between flex-col items-start">
														<span className="line-clamp-1">{result.title}</span>
														<span className="line-clamp-2 text-sm text-gray-600 font-normal">
															{result.description}
														</span>
													</span>
												</div>
												<div>
													<p className="text-base block font-semibold text-primary">
														${result.discountPrice}
													</p>
													<p className="text-gray-400 line-through">${result.price}</p>
												</div>
											</button>
										)
									})
								) : (
									<div className="text-gray-800 text-center">Not found...</div>
								)}
							</div>
						</div>
					</div>
				)}
			>
				<div className="relative">
					<input
						className={cx(
							searchValue
								? 'w-[350px] transition-all duration-300 rounded-full border border-gray-500 px-5 py-2 focus:outline-none dark:border-gray-800 dark:bg-gray-800 group-hover:dark:bg-gray-700'
								: 'w-0 group-hover:w-[350px] transition-all duration-300 rounded-full border border-gray-500 px-5 py-2 focus:outline-none dark:border-gray-800 dark:bg-gray-800 group-hover:dark:bg-gray-700'
						)}
						ref={inputRef}
						value={searchValue}
						placeholder="Search..."
						spellCheck={false}
						onChange={(e) => {
							if (!e.target.value.startsWith(' ')) setSearchValue(e.target.value)
						}}
						onMouseEnter={() => setShowResult(true)}
						onFocus={() => setShowResult(true)}
					/>
					{!!searchValue && !loading && (
						<button
							className=""
							onClick={() => {
								setSearchValue('')
								setSearchResult([])
								inputRef.current.focus()
							}}
						>
							<IoMdCloseCircle className="absolute top-3 right-12 text-xl hover:text-red-300" />
						</button>
					)}
					{loading && (
						<AiOutlineLoading3Quarters className="absolute top-3 right-12 text-xl hover:text-red-300 animate-spin" />
					)}
					<button className="" onMouseDown={(e) => e.preventDefault()}>
						<div>
							<IoMdSearch className="cursor-pointer text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
						</div>
					</button>
				</div>
			</HeadlessTippy>
		</span>
	)
}

export default Search
