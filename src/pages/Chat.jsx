import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { selectUserInfo } from '../redux/Slices/User/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { createConversation, getConversation } from './../redux/Slices/Chat/chatAPI'
import { IoSend } from 'react-icons/io5'
import { MdOutlineRemove } from 'react-icons/md'
import axios from 'axios'

const socket = io.connect('http://localhost:3200')
const isoDateFormatRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/

function Chat() {
	const dispatch = useDispatch()
	const userInfo = useSelector(selectUserInfo)

	const [conversation, setConversation] = useState({})
	const [showChat, setShowChat] = useState(false)
	const [currentMessage, setCurrentMessage] = useState('')
	const [messageList, setMessageList] = useState([])

	const sendMessage = async () => {
		if (currentMessage !== '') {
			const messageData = {
				senderId: {
					_id: userInfo.id,
					name: userInfo?.name,
					email: userInfo.email,
				},
				body: currentMessage,
				createdAt: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes(),
			}
			await axios
				.post('http://localhost:3300/api/message/', {
					body: currentMessage,
					conversationId: conversation?._id,
					senderId: userInfo.id,
				})
				.then(async () => {
					await socket.emit('send_message', messageData)
					setMessageList((list) => [...list, messageData])
					setCurrentMessage('')
				})
		}
	}

	console.log(conversation)

	useEffect(() => {
		socket.off('receive_message').on('receive_message', (data) => {
			setMessageList((list) => [...list, data])
		})
	}, [socket])

	useEffect(() => {
		if (userInfo?.id) {
			getConversation(userInfo?.id).then((data) => {
				setConversation(data.data?.conversation)
				socket.emit('join_room', conversation?.name)
			})
		}
	}, [userInfo])

	console.log(conversation)
	const ChatNow = () => {
		if (!conversation) {
			createConversation({
				user1Id: '2346ef02fb8441d7a14175ed',
				user2Id: userInfo?.id,
				name: userInfo?.id,
			})
			socket.emit('join_room', userInfo?.id)
			setShowChat(true)
		} else {
			setMessageList(conversation?.messages)
			setShowChat(true)
		}
	}

	return (
		<div>
			{!showChat ? (
				<div className="flex flex-col text-center">
					<button
						onClick={ChatNow}
						className="text-white text-base font-semibold rounded-full h-[50px] m-2 p-2 bg-primary/80 cursor-pointer hover:bg-primary"
					>
						Chat
					</button>
				</div>
			) : (
				<div className="w-[300px] h-[420px]">
					<div
						onClick={() => setShowChat(false)}
						className="h-[45px] p-4 rounded-t-md bg-secondary cursor-pointer relative flex justify-between items-center"
					>
						<div className="flex items-center">
							<div className="w-3 h-3 rounded-full bg-green-600 mr-4"></div>
							<p className="text-gray-100 font-semibold text-lg">Chat with admin</p>
						</div>
						<MdOutlineRemove className="text-white font-bold text-xl hover:bg-gray-200 rounded-full hover:text-gray-800" />
					</div>
					<div className="relative bg-gray-100 border border-secondary w-full h-[335px] pt-45 pb-70">
						<div className="w-full h-full overflow-y-scroll overflow-x-hidden">
							{messageList?.map((messageContent) => {
								return (
									<div
										className={`h-auto p-3 flex ${
											userInfo?.id === messageContent.senderId?._id
												? 'justify-end'
												: 'justify-start'
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
													userInfo?.id === messageContent.senderId?._id
														? 'justify-end'
														: 'justify-start'
												}`}
											>
												<p className="text-xs text-gray-500">
													{isoDateFormatRegex.test(messageContent.createdAt)
														? new Date(messageContent.createdAt)
																.getHours()
																.toString()
																.padStart(2, '0') +
														  ':' +
														  new Date(messageContent.createdAt)
																.getMinutes()
																.toString()
																.padStart(2, '0')
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
						</div>
					</div>
					<div className="h-10 border-t-0 border border-secondary flex">
						<input
							type="text"
							className="h-full border-0 border-r flex-[85%] border-secondary outline-none focus:ring-0"
							value={currentMessage}
							placeholder="Chat with admin..."
							onChange={(event) => {
								setCurrentMessage(event.target.value)
							}}
							onKeyDown={(event) => {
								event.key === 'Enter' && sendMessage()
							}}
						/>
						<button
							className="flex-[15%] grid place-items-center cursor-pointer h-full bg-transparent outline-none text-gray-600 hover:bg-secondary hover:text-white text-xl"
							onClick={sendMessage}
						>
							<IoSend className="text-lg" />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Chat
