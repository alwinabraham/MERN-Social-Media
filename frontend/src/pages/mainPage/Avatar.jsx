import React,{useState,useEffect} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios'

export default function Avatar(props) {

  const size = props.size
  const file = props.file

  // const [user,setUser] = useState()
  // const [posts,setPosts] = useState()
  // const [check,setCheck] = useState()
  // const [cookies,setCookie,removeCookie] = useCookies([])

  // const verifyUser = async ()=>{
  //   if(!cookies.jwt){
  //     navigate("/login")
  //   }else{
  //     const {data} = await axios.post(
  //       "http://localhost:4000",{},
  //       {withCredentials: true}
  //       );
  //       setUser(data?.user?._id)
  //       if(!data.status){
  //         removeCookie("jwt");
  //         navigate("/login");
  //       }else {};
  //     }
  //   }

  //   const post ={
  //     userId:user
  //   }

  //   const fetchPosts = async()=>{
  //     if(post?.user){
  //       const {data} =  await axios.post("http://localhost:4000/profile_image",{
  //           post
  //       },
  //       {
  //           withCredentials:true,
  //       })
  //       if(data?._id){
  //         console.log(data);
  //         setPosts(data)
  //       }else{
  //         setCheck(check+1)
  //       }
  //     }
  // }

  //   verifyUser()
    

  //   useEffect(() => {
  //   //  user && fetchPosts()
  //   fetchPosts()
  //   },[check])

  let width = 'w-12'

  if(size === 'big'){
    width = 'w-36'
  }
  return (
    <div className={`${width} rounded-full overflow-hidden`}>
        <img src={file} />
    </div>
  )
}
