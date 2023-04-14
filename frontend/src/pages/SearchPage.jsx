import React,{useState,useEffect} from 'react'
import axios from 'axios'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import ProfileCover from './mainPage/ProfileCover'
import ProfilePostCard from './ProfilePage/ProfilePostCard'

const SearchPage = () => {

    const [posts,setPosts] = useState()
    const [check,setCheck] = useState()

    const fetchPosts = async()=>{
        try {
            const {data} =  await axios.post("http://localhost:4000/profile_post",{
                userId:id
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
        fetchPosts()
    }, [check])
    
    return (
        <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
        <div className='w-2/12'>
            <NavigationCard />
        </div>
            <div className='w-10/12'>
            <Search />
            <ProfileCover data={id} posts={posts} />
            {posts && <ProfilePostCard posts={posts} data={id} />}
            </div>
        </div>
    )
}

export default SearchPage