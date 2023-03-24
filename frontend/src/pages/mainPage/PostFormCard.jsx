import React from 'react'
import Card from './Card'

export default function PostFormCard() {
  return (
    <Card>
        <div className='flex gap-3'>
        <div className='w-12'>
            <img src='https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80' />
        </div>
            <textarea className='grow' placeholder={'Whats on your mind'} />
        </div>
    </Card>
  )
}
