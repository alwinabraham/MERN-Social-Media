import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { sharedPost } from '../api/PostRequests';
import NavigationCard from './mainPage/NavigationCard';
import PostCard from './mainPage/PostCard'

const Share = () => {
  
  const { id } = useParams();
  const [post,setPost] = useState()

  useEffect(() => {
    const getSharedPost = async () => {
      const data = await sharedPost({id})
      setPost(data)
    }
    getSharedPost()
  }, [id])
  
  console.log(id);
  console.log(post);


  return (
    <div className='flex mt-4 max-w-8xl mx-14 gap-6'>
      <div className='w-2/12'>
        <NavigationCard />
      </div>
        <div className='w-10/12'>
          {post && <PostCard post={post} />}
        </div>
    </div>
  )
}

export default Share