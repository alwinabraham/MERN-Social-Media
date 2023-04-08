import React,{useState} from 'react'
import Card from './Card'
import Avatar from './Avatar'

export default function ProfileCover(props) {
    
    const postNo = props?.posts?.length
    const data = props.data
    const value = props.posts ? props.posts[0].imageUser : ""

    return (
    <Card noPadding={true}>
    <div className='relative overflow-hidden rounded-md'>
        <div className='h-40 overflow-hidden flex justify-center items-center'>
            <img src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80' />
        </div>
        <div className='absolute top-24 left-5'>
            <Avatar size={'big'} 
            file={value}
             />
        </div>
        <div className='p-4 pb-20'>
        <div className='flex justify-between text-center'>
            <div className='ml-40'>
                <h1 className='text-3xl font-bold'>
                    {data?.name}
                </h1>
            </div>
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
            <div>
            <button class="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded-full">
                Edit
            </button>
            </div>
        </div>
        </div>
    </div>

    </Card>
  )
}
