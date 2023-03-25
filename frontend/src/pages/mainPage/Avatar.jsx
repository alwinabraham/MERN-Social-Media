import React from 'react'

export default function Avatar({size}) {

  let width = 'w-12'

  if(size === 'big'){
    width = 'w-24'
  }
  return (
    <div className={`${width} rounded-full overflow-hidden`}>
        <img src='https://images.unsplash.com/photo-1555952517-2e8e729e0b44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80' />
    </div>
  )
}
