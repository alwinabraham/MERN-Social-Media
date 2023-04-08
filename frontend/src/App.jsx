import React,{ useState,useEffect } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import OtpLogin from './pages/otpLogin/OtpLogin'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Chats from './pages/Chats'
import "react-toastify/dist/ReactToastify.css"
import Friends from './pages/Friends'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setLogin } from './redux/userData'

function App() {

  // const [id, setId] = useState()
  const dispatch = useDispatch();
  
  const verifyUser = async ()=>{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        // setId(data?.user?._id)
        dispatch(setLogin({user:data?.user?._id}))
    }

    useEffect(() => {
      verifyUser()
    }, [])

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
