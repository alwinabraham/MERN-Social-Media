import React,{useState,useEffect} from 'react'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import NotificationCard from './NotificationPage/NotificationCard'
import { useSelector } from 'react-redux'
import { getNotification } from '../api/NotificationRequests'

export default function Notification() {

    const {user} = useSelector((state)=>state.user)
    const [notifications,setNotifications] = useState()

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
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
        <div className='w-3/12'>
        <NavigationCard />
        </div>
        <div className='w-9/12'>
            <Search/>
            <NotificationCard notifications={notifications}/>
        </div>
    </div>
  )
}
