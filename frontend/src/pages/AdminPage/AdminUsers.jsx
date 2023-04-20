import React,{useEffect,useState} from 'react'
import { getAllUsers } from '../../api/AdminRequests'
import AdminBlockList from './AdminBlockList'
import AdminNav from './AdminNav'

const AdminUsers = () => {

  const [value,setValue] = useState()

  useEffect(() => {
    const usersData = async () =>{
      const {data} = await getAllUsers()
      console.log(data);
      setValue(data)
    }
    usersData()
  }, [])
  
  return (
    <div>
      <AdminNav />
     {value && <AdminBlockList user={value}/>}
    </div>
  )
}

export default AdminUsers