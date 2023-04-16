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
        <img className="w-16 rounded-full overflow-hidden" src={userData?.imageName} />
        <div className="name mt-3" style={{fontSize:"0.8rem"}}>
          <span className='font-semibold text-base'>{userData?.name}</span>
        </div>
      </div>
    </div>
  )
}
