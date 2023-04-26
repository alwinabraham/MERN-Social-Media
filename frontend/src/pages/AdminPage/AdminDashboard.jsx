import React,{useEffect,useState,useRef} from 'react'
import { countAllPost, countAllUsers, dailyPost, monthlyPost, yearlyPost } from '../../api/AdminRequests'
import BarChartComponent from '../ChartPage/BarChartComponent'
import NavChartCard from '../ChartPage/NavChartCard'
import AdminNav from './AdminNav'
import DataTableComponent from './DataTableComponent'
import { io } from 'socket.io-client'

const AdminDashboard = () => {
  const [dailyData,setDailyData] = useState()
  const [monthlyData,setMonthlyData] = useState()
  const [newPostToday,setNewPostToday] = useState()
  const [yearlyData,setYearlyData] = useState()
  const [postCount,setPostCount] = useState()
  const [userCount,setUserCount] = useState()
  const [onlineUsers,setOnlineUsers] = useState()
  const socket = useRef()

  useEffect(() => {
    socket.current = io('http://localhost:8800')
    socket.current.emit('get-users-count')
    socket.current.on('users-Count',(count)=>{
      setOnlineUsers(count);
    })
  })

  console.log("OnlineUsers",onlineUsers);

  const totalPosts = async () =>{
    const {data} = await countAllPost()
    setPostCount(data)
  }

  const totalUsers = async () =>{
    const {data} = await countAllUsers()
    setUserCount(data)
  }

  const getDailyPosts = async () => {
    const {data} = await dailyPost()
    setDailyData(data)
    const today = data.length
    const todayCount = data[today-1].count
    setNewPostToday(todayCount)
}
  const getYearlyPosts = async () => {
    const {data} = await yearlyPost()
    setYearlyData(data)
  }

  const getMonthlyPosts = async () => {
    const {data} = await monthlyPost()
    setMonthlyData(data)
  }

  useEffect(() => {
    getDailyPosts()
    totalPosts()
    totalUsers()
    getMonthlyPosts()
    getYearlyPosts()
}, [])

    return (
      <div>
        <AdminNav />
      <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
      <div className='w-1/12'></div>
        <div className='w-8/12'>
          <div className='m-20 flex justify-between'>
            <NavChartCard count={postCount} action={"Posts"}/>
            <NavChartCard count={userCount} action={"Users"} />
            <NavChartCard count={newPostToday} action={"Posted Today"} />
            <NavChartCard count={onlineUsers} action={"Currently Active"} />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1 className='m-5 font-bold text-2xl'>Daily Post Count</h1>
              {dailyData && <BarChartComponent data={dailyData} color={"#82ca9d"}/>}
            </div>
            <div className='flex flex-col'>
              <h1 className='m-5 font-bold text-2xl'>monthly Post Count</h1>
              {monthlyData && <BarChartComponent data={monthlyData} color={"#8884d8"} />}
            </div>
            <div className='flex flex-col'>
              <h1 className='m-5 font-bold text-2xl'>Yearly Post Count</h1>
              {yearlyData && <BarChartComponent data={yearlyData} color={"#ffc658"}/>}
            </div>
          </div>
          <DataTableComponent />
        </div>
        <div className='w-2/12'></div>
      </div>
      </div>
    )
}

export default AdminDashboard