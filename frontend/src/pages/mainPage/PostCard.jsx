import React,{useState,useEffect,useRef} from 'react'
import Card from './Card'
import NameComponent from './NameComponent'
import Avatar from './Avatar'
import { useSelector,useDispatch } from 'react-redux'
import Timeago from 'react-timeago'
import { createComment, getComment } from '../../api/CommentRequests'
import DropDownComponent from './DropDownComponent'
import ReplyComponent from '../CommentPage/ReplyComponent'
import ProfileImageComponent from '../ProfileImagePage/ProfileImageComponent'
import { likePost } from '../../api/PostRequests'
import CommentCountComponent from './CommentCountComponent'
import { io } from 'socket.io-client'
import { setNotification } from '../../redux/userData'

export default function PostCard(props) {

    const [post,setPost] = useState()
    const dispatch = useDispatch()
    const [comment,setComment] = useState()
    const [commentValue,setCommentValue] = useState()
    const [postIdSetter,setpostIdSetter] = useState()
    const [checkComment,setCheckComment] = useState()
    const [showComment,setShowComment] = useState()
    const [share,setShare] = useState()
    const [like,setLike] = useState()
    const posts = props.post.data
    const [data,setData] = useState()
    const [showModal, setShowModal] = useState(false);
    const [notifi,setNotifi] = useState()
    const [target,setTarget] = useState()
    const [notifiCount,setNotifiCount] = useState(0)
    const user = useSelector((state)=>state.user)
    
    const socket = useRef()
    
    
    const sendNotification = {
        receiverId:user.user,
        userId:target
    }
        
    const postData = {
        postId:post,
        userId:user.user
    }
    
    const commentData = {
        postId:comment,
        userId:user.user,
        comment:commentValue,
    }
    
    dispatch(setNotification({notification:notifiCount}))
    
    useEffect(() => {
        try {
            socket.current = io('http://localhost:8800')
            socket.current.on("notification",(data)=>{
            if(data.userId === user.user){
                setNotifiCount(notifiCount+1)
            }
            setNotifi(data)
            })
        } catch (error) {
            console.log(error);         
        }
      })
        
    useEffect(() => {
        addLike()       
    },[post,like])
    
    useEffect(() => {
        getComments()
    }, [postIdSetter,checkComment])
    
    const addLike = async()=>{
        const {data} = await likePost(postData)
        if(data?.value?.value === true){
            socket.current.emit("send-notification", sendNotification);
        }
        setData(data)
    }

    const addComment = async()=>{
        const {data} = await createComment(commentData)
    }

    const getComments = async()=>{
        const {data} = await getComment({postId:postIdSetter})
        setShowComment(data)
    }
    
  return (
    <>
        {posts.map(obj=>(
            <Card>
                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <Avatar file={obj.imageUrl} />
                        <div>
                            <div className='flex items-center gap-1'>
                                <span className='flex font-semibold'><NameComponent userId={obj._doc.userId}/></span>
                                <p> shared a post</p>
                            </div>
                            <p className='text-gray-500 text-sm'><Timeago date={obj._doc.dateAndTime} /></p>
                        </div>
                    </div>
                    <div>
                        <DropDownComponent postId={obj._doc._id} userId={user.user}/>
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
            <div className='mt-3 flex gap-8'>
                <button className='flex gap-2 items-center' onClick={()=>{setPost(obj._doc._id);setLike(!like);setTarget(obj._doc.userId)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                    </svg>
                    {data?.likes?data.likes:obj._doc.likes.length}
                </button>
                <button className='flex gap-2 items-center' onClick={()=>{setpostIdSetter(obj._doc._id);setCheckComment(!checkComment);setShowModal(true)}}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <CommentCountComponent postId={obj._doc._id} />
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
                <form>
                    <div className='flex items-center'>
                        <div className='border grow rounded-full'>
                            <input className='block border w-full grow p-3 px-4 h-12 overflow-hidden rounded-full' placeholder='leave a comment' onClick={()=>setComment(obj._doc._id)} onChange={(e)=>setCommentValue(e.target.value)} />
                        </div>
                        <div>
                            <button type='submit' onClick={addComment}>Send</button>
                        </div>
                    </div>
                </form>
            </div>
            {showModal ? (
                <>
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none" >
                    <div className="relative my-6 w-96 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0  rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*body*/}
                            <div className="relative p-6 flex-auto">
                            {showComment.map((obj)=>(
                                <div className='mb-4'>
                                    <div className='flex justify-between'>
                                        <div className='flex gap-2'>
                                            <ProfileImageComponent userId={obj.userId} />
                                            <div>
                                                <NameComponent userId={obj.userId} />
                                                <p className="font-light">
                                                    {obj.comment}
                                                </p>
                                            </div>
                                        </div>
                                        <Timeago date={obj.createdAt} />
                                    </div>
                                <ReplyComponent commentId={obj._id} />
                                </div>
                                ))}
                            </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)} >
                                Close
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </Card>
        ))}
    </>
  )
}
