import React,{useState,useEffect} from 'react'
import Card from './Card'
import Avatar from './Avatar'
import axios from 'axios'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch,useSelector } from 'react-redux'
import { setCheck } from '../../redux/userData'

export default function ProfileCover(props) {
    
    const postNo = props?.posts?.length
    const data = props.data
    const dispatch = useDispatch()
    const value = props.posts ? props.posts[0].imageUser : ""
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const user = useSelector((state)=>state.user)
    const target = localStorage.getItem("targetId")
    const [owner,setOwner] = useState(false)

    const [name, setName] = useState(data.name)
    const [bio, setBio] = useState(data?.bio)
    const [file, setFile] = useState()
    const [chat,setChat] = useState(false)

    const handleSubmit = async e =>{
        e.preventDefault()
  
        const formData = new FormData();
        formData.append("userId",data._id)
        formData.append("name", name)
        formData.append("bio", bio)
        formData.append("image", file)

        try {
            const {data} = await axios.post("http://localhost:4000/updateProfile", formData ,{ headers: {'Content-Type': 'multipart/form-data'}})
            navigate("/profile")
            dispatch(setCheck({check:data._id}))
        } catch (error) {
            console.log(error);
        }
    }

    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
      }

      const addChat = {
        senderId:user?.user,
        receiverId:target
      }

      useEffect(() => {
        const chatSetting = async () =>{
          const {data} = await axios.post("http://localhost:4000/chat",addChat)
        }
        chatSetting()
      },[chat])

      useEffect(() => {
        const checkUser = () =>{
            if(user?.user!=target){
                setOwner(false)
            }else{
                setOwner(true)
            }
        }
        checkUser()
      }, [user])
      

    return (
    <Card noPadding={true}>
    <div className='relative overflow-hidden rounded-md'>
        <div className='h-40 overflow-hidden flex justify-center items-center'>
            <img src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80' />
        </div>
        <div className='absolute top-24 left-5'>
            <div className='mb-8'>
            <Avatar size={'big'} 
            file={value}
             /> 
            </div>
            <div className='font-medium'>
                {data?.bio}
            </div>
        </div>
        <div className='p-4 pb-20'>
        <div className='flex justify-between text-center'>
            <div className='ml-40'>
                <h1 className='text-3xl font-bold'>
                    {data?.name}
                </h1>
            </div>
            <div className='flex gap-4'>
                <div>
                    <p className="text-gray-900 dark:text-white text-lg">Posts</p>
                    <p>{postNo}</p>
                </div>
                <div>
                    <p className="text-gray-900 dark:text-white text-lg">Followers</p>
                    <p>{data?.followers.length}</p>
                </div>
                <div>
                    <p className="text-gray-900 dark:text-white text-lg">Following</p>
                    <p>{data?.following.length}</p>
                </div>
            </div>
            <div>
            {owner?            
            <button class="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full" onClick={() => setShowModal(true)}>
                Edit
            </button>
            :            
            <button class="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full" onClick={()=>setChat(true)}>
                Chat
            </button>}

            {showModal ? (
                <>
                <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                        <h3 className="text-3xl font-semibold">
                            Edit Profile
                        </h3>
                        <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                        >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                            ×
                            </span>
                        </button>
                        </div>
                        {/*body*/}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative p-6 flex-auto">
                                    <div >
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input name="name" value={name} onChange={e => setName(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                                        <textarea name="bio" value={bio} onChange={e => setBio(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
                                    <div className="mt-5">
                                        <input onChange={fileSelected} type="file" accept="image/*"></input>
                                    </div>
                            </div>
                        {/*footer*/}
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                <button
                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="submit"
                                    // onClick={() => {setShowModal(false);}}
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
            </div>
        </div>
        </div>
    </div>

    </Card>
  )
}
