import React from 'react'
import Card from './Card'
import Avatar from './Avatar'

export default function ProfileCover() {
  return (
    <Card noPadding={true}>
    <div className='relative overflow-hidden rounded-md'>
        <div className='h-36 overflow-hidden flex justify-center items-center'>
            <img src='https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80' />
        </div>
        <div className='absolute top-24 left-4'>
            <Avatar size={'big'}/>
        </div>
        <div className='p-4 pb-24'>
            <div className='ml-40'>
                <h1 className='text-3xl font-bold'>
                    Alwin Abraham
                </h1>
                <div className='text-gray-500 leading-4'>
                    Kerala,India
                </div>
            </div>
        </div>
    </div>

    </Card>
  )
}
