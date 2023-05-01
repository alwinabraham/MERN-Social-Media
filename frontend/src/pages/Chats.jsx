import React,{useState,useEffect,useRef} from 'react'
import '../pages/chatsPage/Chats.css'
import { useSelector } from 'react-redux'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import { userChats } from '../api/ChatRequests'
import Conversation from './chatsPage/Conversation'
import ChatBox from './chatsPage/ChatBox'
import {io} from 'socket.io-client'

export default function Chats() {

  const user = useSelector((state)=>state.user)
  console.log(user.user);
  const [chats,setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)
  const socket = useRef()
  
  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user.user)
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
    })
  }, [user])

  useEffect(() => {
    socket.current.on("recieve-message",(data)=>{
      setReceiveMessage(data)
    })
  })
  
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  useEffect(() => {
    const getChats = async()=>{
      try{
        const {data} = await userChats(user.user)
        setChats(data)
      }catch (error) {

      }
    }
    getChats()
  },[user])

  return (
    <div className='flex mt-4 max-w-8xl sm:mx-5 sm:gap-6'>
      <div className='w-2/12'>
        <NavigationCard />
        <h2>Chats</h2>
          <div className='Chat-list h-96 overflow-y-scroll p-4'>
            {chats.map((chat)=>(
              <div onClick={()=>setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user.user}/>
              </div>
            ))}
          </div>
      </div>
        <div className='w-10/12'>
          <Search />
          <div className='Right-side-chat'>
          <ChatBox chat={currentChat} currentUserId = {user.user} setSendMessage={setSendMessage} receivedMessage={receiveMessage} />
        </div>
        </div>
      </div>
  )
}
