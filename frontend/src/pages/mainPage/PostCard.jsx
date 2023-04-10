import React,{useState,useEffect} from 'react'
import Card from './Card'
import Avatar from './Avatar'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import Timeago from 'react-timeago'

export default function PostCard(props) {

    const [post,setPost] = useState()
    const [comment,setComment] = useState()
    const [share,setShare] = useState()
    const posts = props.post.data
    const {user} = useSelector((state)=>state.user)

    const postData = {
        postId:post,
        userId:user
    }
    
    useEffect(() => {
        addLike()       
    })
    
    const addLike = async()=>{
        try {            
            const {data} = await axios.post("http://localhost:4000/like_post",{
                postData
            },
            {
                withCredentials:true,
            })
        } catch (error) {
        }
    }
    
  return (
    <>
        {posts.map(obj=>(
            <Card>
                <div className='flex gap-3'>
                <Avatar file={obj.imageUrl} />
                    <div>
                        <p><span className='font-semibold'>{obj.name}</span> shared a post</p>
                        <p className='text-gray-500 text-sm'><Timeago date={obj._doc.dateAndTime} /></p>
                    </div>
                </div>
            <div>
                <p className='my-3 text-sm'>
                {obj._doc.content}
                </p>
                <div className='rounded-md overflow-hidden'>
                <img src={obj._doc.imageName} />
                </div>
            </div>
            <div className='mt-3 flex gap-8' onClick={()=>setPost(obj._doc._id)}>
                <button className='flex gap-2 items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                </svg>
                {obj._doc.likes.length}
                </button>
                <button className='flex gap-2 items-center' onClick={()=>setComment(obj._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                12
                </button>
                <button className='flex gap-2 items-center' onClick={()=>setShare(obj._id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
                4
                </button>
            </div>
            <div className='flex mt-2 gap-3'>
                <div>
                    <Avatar file={obj.imageUrl}/>
                </div>
                <div className='border grow rounded-full'>
                    <textarea className='block border grow p-3 px-4 h-12 overflow-hidden rounded-full' placeholder='leave a comment' />
                </div>
            </div>
        </Card>
        ))}
    </>
  )
}
