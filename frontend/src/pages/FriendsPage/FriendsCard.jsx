import React,{ useState, useEffect, useRef} from 'react'
import axios from 'axios'
import NameComponent from '../mainPage/NameComponent' 
import { useNavigate } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { sendFriendRequest } from '../../api/FriendsRequests'
import { setCheck, setNotification } from '../../redux/userData'
import { io } from 'socket.io-client'


export default function FriendsCard(props) {

  const userDetails = props?.users?.data
  const [friend, setFriend] = useState(undefined)
  const [id,setId] = useState()
  const [chat,setChat] = useState("")
  const [userData,setUserData] = useState()
  const [follow,setFollow] = useState(false)
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const userValue = userDetails.filter(use => use._id !== id);
  const navigate = useNavigate()
  const [notifiCount,setNotifiCount] = useState(user.notification)

  const socket = useRef()

  useEffect(() => {
    verifyUser()
  },[user.user,user.check,follow])

  // console.log("follow is",follow);

  const addFriend = {
    targetId:friend,
    userId:user.user
  }

  const addChat = {
    senderId:user.user,
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

  // useEffect(() => {
  //   const chatSetting = async () =>{
  //     const {data} = await axios.post("http://localhost:4000/chat",addChat)
  //   }
  //   chatSetting()
  // },[chat])

  const sendNotification = {
    receiverId:user.user,
    userId:friend
  }

  dispatch(setNotification({notification:notifiCount}))

  useEffect(() => {
    try {
        socket.current = io('http://localhost:8800')
        socket.current.emit('login-user-add', user.user)
        socket.current.on("notification",(data)=>{
            if(data.userId === user.user){
                setNotifiCount(notifiCount+1)
            }
        })
    } catch (error) {
        console.log(error);         
    }
  })

  useEffect(() => {
    const addNewFriend = async ()=>{
        const {data} = await sendFriendRequest(addFriend)
        console.log(data.isFriend.friend);
        if(data.isFriend.friend == true){
          console.log("Sended");
          socket.current.emit("send-notification", sendNotification);
      }
        dispatch(setCheck({check:addFriend.targetId}))
      }
      setFriend(undefined)
      addNewFriend()
  }, [follow])

  return (
    <>
        {userValue.map(obj=>(
          <>
            <div className="p-3 max-w-7xl mt-1 bg-white rounded flex justify-between border">
            <div className='flex items-center gap-7'>
              <img className="w-20 h-20 mb-3 rounded-full shadow-lg" src={obj.imageName} />
              <p className='font-bold'><NameComponent userId={obj._id}/></p>
            </div>
                <div className='flex items-center justify-between w-60'>
                <div className='flex justify-around'>
                    <div>
                      <button onClick={()=>{setFriend(obj._id);setFollow(!follow)}} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
