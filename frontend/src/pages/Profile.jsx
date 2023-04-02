import React,{useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import ProfilePostCard from './ProfilePage/ProfilePostCard'
import ProfileCover from './mainPage/ProfileCover'

export default function Page() {

  const navigate = useNavigate()
  const [id,setId] = useState()
  const [posts,setPosts] = useState()
  const [check,setCheck] = useState()
  const [cookies,setCookie,removeCookie] = useCookies([])

  const verifyUser = async ()=>{
    if(!cookies.jwt){
      navigate("/login")
    }else{
      const {data} = await axios.post(
        "http://localhost:4000",{},
        {withCredentials: true}
        );
        console.log(data.user._id);
        setId(data.user._id)
        if(!data.status){
          removeCookie("jwt");
          navigate("/login");
        }else {};
    }
  }

  const fetchPosts = async()=>{
      try {
          const {data} =  await axios.post("http://localhost:4000/profile_post",{
              userId:id
          },
          {
              withCredentials:true,
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
  })
  
  useEffect(() => {
    fetchPosts()
  },[check])


  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <NavigationCard />
      </div>
        <div className='w-9/12'>
          <ProfileCover />
          {posts && <ProfilePostCard posts={posts} />}
        </div>
    </div>
  )
}
