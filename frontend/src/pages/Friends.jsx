import React,{useState, useEffect} from 'react'
import FriendsCard from './FriendsPage/FriendsCard'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import axios from 'axios'

export default function Friends() {

  const [users, setUsers] = useState()

  const fetchUsers = () =>{
    axios.get('http://localhost:4000/friends')
        .then((response)=>{
          setUsers(response)
        })
        .catch((error)=>{
            console.log(error);
        });
  }

  useEffect(() => {
    fetchUsers()
  }, [])
  

  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
      <div className='w-3/12'>
        <NavigationCard />
      </div>
        <div className='w-9/12'>
          <Search />
          <div className='flex m-3'>
          {users && <FriendsCard users={users}/>}
          </div>
          {/* <ProfileCover data={id} posts={posts} /> */}
          {/* {posts && <ProfilePostCard posts={posts} data={id} />} */}
        </div>
    </div>
  )
}
