import React,{useState,useEffect} from 'react'

export default function Avatar(props) {

  const size = props.size
  const file = props.file

  let width = 'w-12'

  if(size === 'big'){
    width = 'w-36'
  }
  return (
    <div className={`${width} rounded-full overflow-hidden`}>
        <img src={file} />
    </div>
  )
}
