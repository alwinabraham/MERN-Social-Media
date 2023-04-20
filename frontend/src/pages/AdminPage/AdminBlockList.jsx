import React from 'react'
import NameComponent from '../mainPage/NameComponent'

const AdminBlockList = ({user}) => {

  return (
    <>
        {user.map(obj=>(
          <>
            <div className="p-3 max-w-7xl mt-1 bg-white rounded flex justify-between border">
            <div className='flex items-center gap-7'>
              <img className="w-20 h-20 mb-3 rounded-full shadow-lg" src={obj.imageName} />
              <p className='font-bold'><NameComponent userId={obj._id}/></p>
            </div>
                <div className='flex items-center justify-between w-60'>
                <div className='flex justify-around'>
                    <div>
                      <button 
                    //   onClick={()=>setChat(obj._id)} 
                      className="items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                        Block
                      </button>
                    </div>
                </div>
                </div>
            </div>
          </>
        ))}
    </>
  )
}

export default AdminBlockList