import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { IoMdSearch, IoMdCloseCircle } from 'react-icons/io'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

import HeadlessTippy from '@tippyjs/react/headless'

import useDebounce from '../../hooks/useDebounce'
import cx from 'classnames'
const Search = () => {
	const [searchResult, setSearchResult] = useState([])
	const [searchValue, setSearchValue] = useState('')
	const [showResult, setShowResult] = useState(true)
	const [loading, setLoading] = useState(false)

	const inputRef = useRef()

	const debounceValue = useDebounce(searchValue, 500)

	const fakeData = [
		{
			id: 1,
			name: 'item 1',
			price: 1000000,
		},
		{
			id: 2,
			name: 'item 1',
			price: 1000000,
		},
	]

	useEffect(() => {
		if (debounceValue.trim() === '') {
			setSearchResult([])
			return
		}

		const fetchApi = async () => {
			setLoading(true)

			const result = fakeData

			setSearchResult(result)

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
				visible={showResult && searchResult.length > 0}
				render={(attrs) => (
					<div
						className="z-[9999] rounded-md bg-gray-300 w-[350px] min-h-[100px] text-gray-800"
						tabIndex="-1"
						{...attrs}
					>
						<div>
							<h4 className="text-center p-3 uppercase font-bold">Products</h4>
							{searchResult ? (
								searchResult.map((result, index) => {
									return (
										<div
											key={result.id}
											className="flex justify-between p-6 hover:bg-gray-500 last:rounded-b-md"
										>
											<span className="">{index + 1}</span>
											<span className="">{result.name}</span>
											<span className="">{result.price}</span>
										</div>
									)
								})
							) : (
								<div>Not found...</div>
							)}
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

//
