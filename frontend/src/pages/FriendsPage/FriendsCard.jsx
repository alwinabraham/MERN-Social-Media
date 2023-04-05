import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'

export default function FriendsCard(props) {

  const userDetails = props?.users?.data
  const [addFriend, setAddFriend] = useState()
  const [id,setId] = useState()
  const [check,setCheck] = useState()
  const [userData,setUserData] = useState()
  const user = userDetails.filter(use => use._id.toString() !== id);
  
  useEffect(() => {
    addNewFriend()
  }, [addFriend])
  
  useEffect(() => {
    verifyUser()
  },[])
  

  const addObject = {
    targetId:addFriend,
    userId:id
  }

  const [cookies,setCookie,removeCookie] = useCookies([])
  
  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        setId(data?.user?._id)
        setUserData(data?.user)
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
    }
  }

  const addNewFriend = async()=>{
    try {            
        const {data} = await axios.post("http://localhost:4000/send_friendRequest",{
            addObject
        },
        {
            withCredentials:true,
        })
        setCheck(data?.check)
        setAddFriend("")
    } catch (error) {
        
    }
}
  return (
    <>
        {user.map(obj=>(
            <div className="m-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4"></div>
                <div className="m-2 flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={obj.imageName} />
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{obj.name}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                    <div className="flex mt-4 space-x-3 md:mt-6">
                        <button onClick={()=>setAddFriend(obj._id)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            {userData?.following.find((userid)=>{
                                return userid === obj._id
                                }) ? "Unfollow":"Follow"}
                        </button>
                        <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</button>
                    </div>
                </div>
            </div>
        ))}
    </>
  )
}
