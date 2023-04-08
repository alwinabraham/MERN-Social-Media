import React from 'react'
import NavigationCard from './mainPage/NavigationCard'
import Search from './search/search'
import NotificationCard from './NotificationPage/NotificationCard'

export default function Notification() {
  return (
    <div className='flex mt-4 max-w-4xl mx-auto gap-6'>
        <div className='w-3/12'>
        <NavigationCard />
        </div>
        <div className='w-9/12'>
            <Search/>
            <NotificationCard />
        </div>
    </div>
  )
}
