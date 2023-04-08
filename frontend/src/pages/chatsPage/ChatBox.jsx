import React,{useState,useEffect} from 'react'
import { getUser } from '../../api/ChatRequests'
import { getMessages } from '../../api/MessageRequests'
import Timeago from 'react-timeago'
import InputEmoji from "react-input-emoji"
import { addMessage } from '../../api/MessageRequests'

export default function ChatBox({chat, currentUserId, setSendMessage}) {

  const [userData, setUserData] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessages, setNewMessages] = useState("")

  useEffect(() => {
    const userId = chat?.members?.find((id)=>id!==currentUserId)
    const getUserData = async () => {
        try {
            const {data} = await getUser(userId)
            setUserData(data)
        } catch (error) {
            console.log(error);
        }
    }
    if(chat!==null) getUserData()
  }, [chat,currentUserId])
  
  useEffect(() => {
    const fetchMessages = async ()=>{
        try {
            const {data} = await getMessages(chat._id)
            setMessages(data)
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }
    if(chat !== null) fetchMessages()
  }, [chat])
  
  const handleChange = (newMessages) => {
    setNewMessages(newMessages)
  }

  const handleSend = async (e) =>{
    e.preventDefault();
    const message = {
        senderId: currentUserId,
        text: newMessages,
        chatId:chat._id
    }
    try {
        const {data} = await addMessage(message)
        setMessages([...messages,data])
        setNewMessages("")
    } catch (error) {
        console.log(error);
    }
    const receiverId = chat.members.find((id)=>id !== currentUser)
    setSendMessage({...message, receiverId})
  }

  return (
    <>
        <div className='ChatBox-container'>
           {chat?(
            <>
                <div className='chat-header'>
                    <div className='follower'>
                        <div>
                            <img className='followerImage' style={{width: '50px', height:'50px'}} src={userData?.imageName} />
                            <div className="name" style={{fontSize:"0.8rem"}}>
                            <span>{userData?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='chat-body'>
                    {messages.map((message)=>(
                        <>
                            <div className={message.senderId === currentUserId?"message own": "message"}>
                                <span>{message.text}</span>
                                <span><Timeago date={message.createdAt} /></span>
                            </div>
                        </>
                    ))}
                </div>
                <div className='chat-sender'>
                    <div>+</div>
                    <InputEmoji value={newMessages} onChange={handleChange} />
                    <button className='send-button button' onClick={handleSend}>Send</button>
                </div>
            </>
            ):(
                <span className='chatbox-empty-message'>
                    Tap on a Chat to Start Conversation...
                </span>
            )}
        </div>
    </>
  )
}
