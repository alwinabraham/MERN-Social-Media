import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function UsersFriendsCard(props) {

  const [followers,setFollowers] = useState()

  const FollowersList = async()=>{
    try {            
        const {data} = await axios.post("http://localhost:4000/following",{
            userId:props.id
        },
        {
            withCredentials:true,
        })
        setFollowers(data)
    } catch (error) {}
  }

  useEffect(() => {
    FollowersList()
  },[])
  

  return (
    <>
      {followers?.map(obj=>(
        <div className="m-2 bg-white border w-52 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={obj.imageName} />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{obj.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">Visual Designer</span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                    Remove
                    </button>
                </div>
            </div>
        </div>
      ))}
    </>
  )
}
