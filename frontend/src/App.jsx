import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import './App.css'
import Page from './pages/Page'
import Login from './pages/Login'
import Register from './pages/Register'
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/" element={<Page />} />
        {/* <Route exact path="/otp_login" element={<OtpLogin />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
