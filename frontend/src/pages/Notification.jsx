import React,{useState,useEffect} from 'react'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import NotificationCard from './NotificationPage/NotificationCard'
import { useSelector } from 'react-redux'
import { getNotification } from '../api/NotificationRequests'

export default function Notification() {

    const {user} = useSelector((state)=>state.user)
    const [notifications,setNotifications] = useState()
    console.log(notifications);

    useEffect(() => {
        const getUserData = async()=>{
            try {
            const {data} = await getNotification(user)
            setNotifications(data)
            } catch (error) {      
            }
        }
        getUserData()
    }, [user])

    console.log(notifications);

    return (
        <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
        <div className='w-2/12'>
        <NavigationCard />
        </div>
        <div className='w-10/12'>
            <Search/>
            {notifications && <NotificationCard notifications={notifications}/>}
        </div>
    </div>
  )
}
