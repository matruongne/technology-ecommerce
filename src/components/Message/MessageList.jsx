import React, { useEffect, useRef } from 'react'
const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

const MessageList = ({ messageList, userInfo }) => {
	const ref = useRef()

	useEffect(() => {
		if (messageList.length) {
			ref.current?.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			})
		}
	}, [messageList.length])

	return (
		<div className="relative bg-gray-100 border border-secondary w-full h-[335px] pt-45 pb-70">
			<div className="w-full h-full overflow-y-scroll overflow-x-hidden">
				{messageList?.map((messageContent) => {
					return (
						<div
							className={`h-auto p-3 flex ${
								userInfo?.id === messageContent.senderId?._id ? 'justify-end' : 'justify-start'
							}`}
						>
							<div
								className={`flex justify-center flex-col ${
									userInfo?.id === messageContent.senderId?._id ? 'items-end' : 'items-start'
								}`}
							>
								<div
									className={`w-fit h-auto min-h-10 max-w-32 bg-secondary/80 rounded-lg text-white flex items-center p-1 mx-1 break-words ${
										userInfo?.id === messageContent.senderId?._id
											? 'justify-end'
											: 'justify-start bg-yellow-400'
									}`}
								>
									<p>{messageContent.body}</p>
								</div>
								<div
									className={`flex ${
										userInfo?.id === messageContent.senderId?._id ? 'justify-end' : 'justify-start'
									}`}
								>
									<p className="text-xs text-gray-500">
										{isoDateFormatRegex.test(messageContent.createdAt)
											? new Date(messageContent.createdAt).getHours().toString().padStart(2, '0') +
											  ':' +
											  new Date(messageContent.createdAt).getMinutes().toString().padStart(2, '0')
											: messageContent.createdAt}
									</p>
									<p className="ml-1 text-xs text-gray-500 font-semibold">
										{messageContent.senderId?.name || messageContent.senderId?.email}
									</p>
								</div>
							</div>
						</div>
					)
				})}
				<div ref={ref} />
			</div>
		</div>
	)
}

export default MessageList
