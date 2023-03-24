import React from 'react'

export default function Card({children}) {
  return (
    <div className='bg-white shadow-xl rounded-md p-4 mb-5'>
        {children}
    </div>
  )
}
