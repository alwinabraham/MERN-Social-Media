import React,{ useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import OtpLogin from './pages/otpLogin/OtpLogin'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Page />} />
        <Route exact path="/otp_login" element={<OtpLogin />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
