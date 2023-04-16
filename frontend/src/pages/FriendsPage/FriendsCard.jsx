import React,{useState, useEffect} from 'react'
import axios from 'axios'
import NameComponent from '../mainPage/NameComponent' 

export default function FriendsCard(props) {

  const userDetails = props?.users?.data
  const [addFriend, setAddFriend] = useState()
  const [id,setId] = useState()
  const [chat,setChat] = useState()
  const [check,setCheck] = useState()
  const [userData,setUserData] = useState()
  const user = userDetails.filter(use => use._id !== id);
  
  useEffect(() => {
    addNewFriend()
  }, [addFriend])
  
  useEffect(() => {
    verifyUser()
  },[id])

  const addObject = {
    targetId:addFriend,
    userId:id
  }

  const addChat = {
    senderId:id,
    receiverId:chat
  }
  
  const verifyUser = async ()=>{
      const {data} = await axios.post(
        "http://localhost:4000",{},{
          withCredentials:true
        });
        setId(data?.user?._id)
        setUserData(data?.user)
  }

  const chatSetting = async () =>{
    try {            
      const {data} = await axios.post("http://localhost:4000/chat",{
          addChat
      })
  } catch (error) {}
}

  const addNewFriend = async()=>{
    try {            
        const {data} = await axios.post("http://localhost:4000/chat/createUser",{
            addObject
        })
        setCheck(data?.check)
        setAddFriend("")
    } catch (error) {}
  }
  
  useEffect(() => {
    chatSetting()
  },[chat])

  return (
    <>
        {user.map(obj=>(
          <>
            <div className="p-3 max-w-7xl mt-1 bg-white rounded flex justify-between border">
            <div className='flex items-center gap-7'>
              <img className="w-20 h-20 mb-3 rounded-full shadow-lg" src={obj.imageName} />
              <p className='font-bold'><NameComponent userId={obj._id}/></p>
            </div>
                <div className='flex items-center justify-between w-60'>
                <div className='flex justify-around'>
                    <div>
                      <button onClick={()=>setAddFriend(obj._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                {userData?.following.find((userid)=>{
                                    return userid === obj._id
                                    }) ? "Unfollow":"Follow"}
                      </button>
                      <button onClick={()=>setChat(obj._id)} className="items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                        Message
                      </button>
                    </div>
                </div>
                </div>
            </div>
          </>
        ))}
    </>
  )
}
