import React,{useState,useEffect,useRef} from 'react'
import '../pages/chatsPage/Chats.css'
import { useSelector } from 'react-redux'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import ChatsCard from './chatsPage/Conversation'
import { userChats } from '../api/ChatRequests'
import Conversation from './chatsPage/Conversation'
import { addMessage } from '../api/MessageRequests'
import ChatBox from './chatsPage/ChatBox'
import {io} from 'socket.io-client'

export default function Chats() {

  const {user} = useSelector((state)=>state?.user)
  const [chats,setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [receiveMessage, setReceiveMessage] = useState(null)

  const socket = useRef()
  
  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('new-user-add', user)
    socket.current.on('get-users',(users)=>{
      setOnlineUsers(users);
      console.log(onlineUsers);
    })
  }, [user])

  useEffect(() => {
    socket.current.on("receive-message",(data)=>{
      setReceiveMessage(data)
    })
  }, [])
  
  
  useEffect(() => {
    if (sendMessage!==null) {
      socket.current.emit("send-message", sendMessage);}
  }, [sendMessage]);

  useEffect(() => {
    const getChats = async()=>{
      try{
        const {data} = await userChats(user)
        setChats(data)
      }catch (error) {

      }
    }
    getChats()
  },[user])
  

  return (
    <div className='Chat'>
      <div className='Left-side-chat'>
      <NavigationCard />
        <h2>Chats</h2>
        <div className='Chat-list'>
          {chats.map((chat)=>(
            <div onClick={()=>setCurrentChat(chat)}>
              <Conversation data={chat} currentUserId={user}/>
            </div>
          ))}
        </div>
      </div>
      <div className='Right-side-chat'>
        <ChatBox chat={currentChat} currentUserId = {user} setSendMessage={setSendMessage} receiveMessage={receiveMessage} />
      </div>
    </div>
    // <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
    //   <div className='w-3/12'>
    //     <NavigationCard />
    //   </div>
    //     <div className='w-9/12'>
    //       <Search />
    //       <ChatsCard />
    //     </div>
    // </div>
  )
}
