import React,{useState, useEffect} from 'react'
import FriendsCard from './FriendsPage/FriendsCard'
import RequestsCard from './FriendsPage/RequestsCard'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import axios from 'axios'

export default function Friends() {

  const [users, setUsers] = useState()
  const [requestPage,setRequestPage] = useState(false)
  const [friendsPage,setFriendsPAge] = useState(false)
  const [suggestionsPage,setSuggestionsPage] = useState(true)

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
           <div className='flex'>
            <button onClick={()=>{setRequestPage(false);setSuggestionsPage(true);setFriendsPAge(false)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full">Suggestions</button>
            <button onClick={()=>{setRequestPage(false);setSuggestionsPage(false);setFriendsPAge(true)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full">Friends</button>
            <button onClick={()=>{setRequestPage(true);setSuggestionsPage(false);setFriendsPAge(false)}} className="m-1 bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full">Requests</button>
           </div>
          <div className='flex m-3'>
          {suggestionsPage && users && <FriendsCard users={users}/>}
          {requestPage && <RequestsCard />}
          </div>
          {/* <ProfileCover data={id} posts={posts} /> */}
          {/* {posts && <ProfilePostCard posts={posts} data={id} />} */}
        </div>
    </div>
  )
}
