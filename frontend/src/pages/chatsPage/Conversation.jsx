import React,{useState,useEffect} from 'react'
import '../chatsPage/Chats.css'
import { getUser } from '../../api/ChatRequests'

export default function Conversation({data, currentUserId}) {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userId = data.members.find((id)=>id!==currentUserId)
    const getUserData = async()=>{
      try {
        const {data} = await getUser(userId)
        setUserData(data)
      } catch (error) {
        
      }
    }
    getUserData()
  }, [])
  
  return (
    <div className='follower conversation'>
      <div>
        <div className='online-dot'></div>
        <img className='followerImage' style={{width: '50px', height:'50px'}} src={userData?.imageName} />
        <div className="name" style={{fontSize:"0.8rem"}}>
          <span>{userData?.name}</span>
          <span>Online</span>
        </div>
      </div>
    </div>
  )
}
