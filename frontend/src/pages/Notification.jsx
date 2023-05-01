import React,{useState,useEffect} from 'react'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import NotificationCard from './NotificationPage/NotificationCard'
import { useSelector } from 'react-redux'
import { getNotification } from '../api/NotificationRequests'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/userData'

export default function Notification() {

    const dispatch = useDispatch()
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

    dispatch(setNotification({notification:0}))

    return (
        <div className='flex mt-4 max-w-8xl sm:mx-5 sm:gap-6'>
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
