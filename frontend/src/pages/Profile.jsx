import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import NavigationCard from './mainPage/NavigationCard'
import PostCard from './mainPage/PostCard'
import ProfileCover from './mainPage/ProfileCover'


export default function Page() {
  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])
  
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
        }else {};
    }
  }

  useEffect(() => {
    verifyUser();
  }, [cookies,navigate,removeCookie])


  return (
    // <>
    //   <div className="private">
    //     <h1>Page</h1>
    //     <button onClick={logout}>Log Out</button>
    //   </div>
    //   <ToastContainer />
    // </>
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <NavigationCard />
      </div>
        <div className='w-9/12'>
          <ProfileCover />
          <PostCard />
        </div>
    </div>
  )
}
