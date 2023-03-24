import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import Card from '../pages/mainPage/Card'
import NavigationCard from './mainPage/NavigationCard'
import PostFormCard from './mainPage/PostFormCard'


export default function Page() {
  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  useEffect(() => {
    const verifyUser = async ()=>{
      if(!cookies.jwt){
        navigate("/login")
      }else{
        const {data} = await axios.post(
          "http://localhost:4000",{},
          {withCredentials: true}
          );
          if(!data.status){
            removeCookie("jwt");
            navigate("/login");
          }else toast(`Hi ${data.user}`, {theme: "dark"});
      }
    }
    verifyUser();
  }, [cookies,navigate,removeCookie])
  

  const logout = () =>{
    navigate("/login")
  }
  return (
    // <>
    //   <div className="private">
    //     <h1>Page</h1>
    //     <button onClick={logout}>Log Out</button>
    //   </div>
    //   <ToastContainer />
    // </>
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-1/3'>
        <NavigationCard />
      </div>
        <div className='grow'>
          <PostFormCard />
          <Card>from here</Card>
        </div>
    </div>
  )
}
