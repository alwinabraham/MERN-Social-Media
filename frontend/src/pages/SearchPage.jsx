import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import ProfileCover from './mainPage/ProfileCover'
import ProfilePostCard from './ProfilePage/ProfilePostCard'
import { useSelector } from 'react-redux'
import { getSearchUser } from '../api/SearchPageRequests'

const SearchPage = () => {

    const [posts,setPosts] = useState()
    const [SearchUser,setSearchUser] = useState()
    const [check,setCheck] = useState()
    
    const verifyUser = async ()=>{
        const {data} = await getSearchUser({searchId:localStorage.getItem("targetId")})
        setSearchUser(data)
    }

    const fetchPosts = async()=>{
        try {
            const {data} =  await axios.post("http://localhost:4000/profile_post",{
                userId:localStorage.getItem("targetId")
            })
            console.log(data);
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
        fetchPosts()
    }, [check])

    useEffect(() => {
        verifyUser()
      },[])
    
    return (
        <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
        <div className='w-2/12'>
            <NavigationCard />
        </div>
            <div className='w-10/12'>
            <Search />
            {SearchUser && <ProfileCover data={SearchUser} posts={posts} />}
            {posts && <ProfilePostCard data={SearchUser} posts={posts} />}
            </div>
        </div>
    )
}

export default SearchPage