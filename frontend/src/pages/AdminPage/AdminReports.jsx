import React,{useState,useEffect} from 'react'
import { getReportedPosts } from '../../api/AdminRequests'
import AdminBlockedPosts from './AdminBlockedPosts'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'

const AdminReports = () => {

  const [posts,setPosts] = useState()
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    const getPosts = async () => {
      const {data} = await getReportedPosts()
      setPosts(data)
    }
    getPosts()
  }, [user])
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <AdminNav />
      <div style={{marginTop: '5rem', alignSelf: 'center'}}>
        {posts && <AdminBlockedPosts posts={posts}/>}
      </div>
    </div>
  )
}

export default AdminReports