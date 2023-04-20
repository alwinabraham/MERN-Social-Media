import React,{ useState,useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import OtpLogin from './pages/otpLogin/OtpLogin'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import Notification from './pages/Notification'
import SearchPage from './pages/SearchPage'
import "react-toastify/dist/ReactToastify.css"
import Friends from './pages/Friends'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin,setSearch } from './redux/userData'
import AdminLogin from './pages/AdminPage/AdminLogin'
import AdminDashboard from './pages/AdminPage/AdminDashboard'
import AdminUsers from './pages/AdminPage/AdminUsers'
import AdminReports from './pages/AdminPage/AdminReports'

function App() {

  const dispatch = useDispatch();
  
  const verifyUser = async ()=>{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        dispatch(setLogin({user:data?.user?._id}))
    }

    useEffect(() => {
      verifyUser()
    }, [])

    const user = useSelector((state) => state.user);
    console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Page />} />
        <Route exact path="/otp_login" element={<OtpLogin />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/friends" element={<Friends />} />
        <Route exact path="/chats" element={<Chats />} />
        <Route exact path="/notification" element={<Notification />} />
        <Route exact path="/searchPage" element={<SearchPage />} />
        <Route exact path="/admin" element={<AdminLogin />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/userDetails" element={<AdminUsers />} />
        <Route exact path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
