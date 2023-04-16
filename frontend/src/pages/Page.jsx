import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import PostFormCard from './mainPage/PostFormCard'
import Search from './search/search'
import PostCard from './mainPage/PostCard'
import { useSelector } from 'react-redux';

export default function Page() {

  const {user} = useSelector((state)=>state.user)
  const [post,setPost] = useState()
  const navigate = useNavigate();

  const [cookies,setCookie,removeCookie] = useCookies([])

  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        `http://localhost:4000`,{},
        {withCredentials: true}
        );
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
    }
  }

  
  useEffect(() => {
    fetchPosts();    
  },[user])
  
  useEffect(() => {
    verifyUser();
  }, [cookies,navigate,removeCookie])
  
  const fetchPosts = () =>{
    axios.get(`http://localhost:4000/${user}`)
        .then((response)=>{
          setPost(response)
        })
        .catch((error)=>{
            console.log(error);
        });
  }

  return (
    <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
      <div className='w-2/12'>
        <NavigationCard />
      </div>
        <div className='w-10/12'>
          <Search/>
          <PostFormCard />
          {post && <PostCard post={post} />}
        </div>
    </div>
  )
}
