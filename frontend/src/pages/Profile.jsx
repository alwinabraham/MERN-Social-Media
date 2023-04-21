import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import ProfilePostCard from './ProfilePage/ProfilePostCard'
import ProfileCover from './mainPage/ProfileCover'
import Search from './search/search'
import { useSelector } from 'react-redux'

export default function Page() {

  const [id,setId] = useState()
  const [posts,setPosts] = useState()
  const [check,setCheck] = useState()
  const navigate = useNavigate()
  const [cookies,setCookie,removeCookie] = useCookies([])
  const user = useSelector((state)=>state.user)
  console.log(user);
  
  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        setId(data?.user) 
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
      }
    }
    
  const fetchPosts = async()=>{
      try {
          const {data} =  await axios.post("http://localhost:4000/profile_post",{
              userId:user?.user
          })
          if(data.length == 0){
            setCheck(check+1)
          }else{
            setPosts(data)
          }
      } catch (error) {
          console.log(error);
      }
  }
  useEffect(() => {
    verifyUser()
  },[user])
  
  useEffect(() => {
    fetchPosts()
  },[check,user])


  return (
    <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
      <div className='w-2/12'>
        <NavigationCard />
      </div>
        <div className='w-10/12'>
          <Search />
          {id && <ProfileCover data={id} posts={posts} />}
          {posts && <ProfilePostCard posts={posts} data={id} />}
        </div>
    </div>
  )
}
