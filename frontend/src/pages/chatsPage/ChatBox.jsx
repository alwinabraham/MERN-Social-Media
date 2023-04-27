import React,{useState,useEffect} from 'react'
import { getUser } from '../../api/ChatRequests'
import { getMessages } from '../../api/MessageRequests'
import Timeago from 'react-timeago'
import InputEmoji from "react-input-emoji"
import { addMessage } from '../../api/MessageRequests'
import '../Chats'

const ChatBox = ({ chat, currentUserId, setSendMessage,  receivedMessage }) => {

    console.log("chatbox", receivedMessage);
    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [update,setUpdate] = useState(false)
 
    const handleChange = (newMessage)=> {
      setNewMessage(newMessage)
    }
  
    // fetching data for header
    useEffect(() => {
      const userId = chat?.members?.find((id) => id !== currentUserId);
      const getUserData = async () => {
        try {
          const { data } = await getUser(userId);
          setUserData(data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (chat !== null) getUserData();
    }, [chat, currentUserId]);
  
  
    // fetch messages
    useEffect(() => {
      const fetchMessages = async () => {
        try {
          const { data } = await getMessages(chat._id);
          setMessages(data);
          console.log("messages",data);
        } catch (error) {
          console.log(error);
        }
      };
  
      if (chat !== null) fetchMessages();
    }, [chat]);
  
  
    // // Always scroll to last Message
    // useEffect(()=> {
    //   scroll.current?.scrollIntoView({ behavior: "smooth" });
    // },[update])
  
  
  
    // Send Message
    const handleSend = async(e)=> {
      e.preventDefault()
      const message = {
        senderId : currentUserId,
        text: newMessage,
        chatId: chat._id,
        createdAt:new Date()
    }
    const receiverId = chat.members.find((id)=>id!==currentUserId);
    // send message to socket server
    setSendMessage({...message, receiverId})
    setUpdate(!update)
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    }
    catch
    {
      console.log("error")
    }
  }
  
  // Receive Message from parent component
  useEffect(()=> {
    console.log("Message Arrived: ", receivedMessage)
    if (receivedMessage !== null && receivedMessage?.chatId === chat?._id) {
      setMessages([...messages, receivedMessage]);
    }
  },[receivedMessage])

  const chatBody = document.querySelector('.chat-body');
  chatBody.scrollTop = chatBody.scrollHeight;

  return (
    <>
        <div className='flex items-center'>
            <img className="w-16 rounded-full overflow-hidden" src={userData?.imageName} />
            <div className="name" style={{ fontSize: "0.8rem" }}>
            <span className='font-bold text-xl'>{userData?.name}</span>
            </div>
        </div>
        <div className='ChatBox-container' style={{
            position: "relative",
            display: "grid",
            gap: "1rem",
            }}>
        {chat ? (
            <>
            <div className='chat-body' style={{display: "flex",flexDirection: "column",gap: "1rem",padding: "1rem",overflowY: "scroll",maxHeight: "calc(80vh - 150px)",}}>
                {messages?.map((message) => (
                <div className={message?.senderId === currentUserId ? "message own" : "message"} style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    alignItems: message?.senderId === currentUserId ? "flex-end" : "flex-start",
                }}>
                    <span>{message?.text}</span>
                    <span style={{ fontSize: "0.7rem", color: "#555" }}><Timeago date={message?.createdAt} /></span>
                </div>
                ))}
            </div>
            <div className='flex'>
                <div style={{ fontSize: "1.5rem" }}>+</div>
                <InputEmoji value={newMessage} onChange={handleChange} />
                <button className='send-button button' style={{
                background: "#3f51b5",
                color: "#fff",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                cursor: "pointer",
                }} onClick={handleSend}>Send</button>
            </div>
            </>
        ) : (
            <span className='chatbox-empty-message' style={{
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            fontSize: "20px",
            }}>
            Tap on a Chat to Start Conversation...
            </span>
        )}
        </div>
    </>
  )
}

export default ChatBox;
