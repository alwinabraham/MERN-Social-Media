import React,{useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import {ToastContainer,toast} from "react-toastify"
import NavigationCard from './mainPage/NavigationCard'
import PostFormCard from './mainPage/PostFormCard'
import PostCard from './mainPage/PostCard'
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/userData';

export default function Page() {
  const [post,setPost] = useState()

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [cookies,setCookie,removeCookie] = useCookies([])
  
  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        dispatch(setLogin({user:data.user._id}))
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
    }
  }

  const fetchPosts = () =>{
    axios.get('http://localhost:4000')
        .then((response)=>{
          console.log(response);
          setPost(response)
        })
        .catch((error)=>{
            console.log(error);
        });
  }

  useEffect(() => {
    fetchPosts();    
  },[])
  
  useEffect(() => {
    verifyUser();
  }, [cookies,navigate,removeCookie])


  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <NavigationCard />
      </div>
        <div className='w-9/12'>
          <PostFormCard />
          {post && <PostCard post={post} />}
        </div>
    </div>
  )
}
