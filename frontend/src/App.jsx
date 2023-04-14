import React,{ useState,useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import OtpLogin from './pages/otpLogin/OtpLogin'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import Notification from './pages/Notification'
import "react-toastify/dist/ReactToastify.css"
import Friends from './pages/Friends'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { setLogin,setSearch } from './redux/userData'

function App() {

  const dispatch = useDispatch();
  
  const verifyUser = async ()=>{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        dispatch(setLogin({user:data?.user?._id}))
        dispatch(setSearch({search:"kitti mone"}))
    }

    useEffect(() => {
      verifyUser()
    }, [])

    const user = useSelector((state) => state.user);
    const search = useSelector((state) => state.search);
    // console.log(user.search);

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
