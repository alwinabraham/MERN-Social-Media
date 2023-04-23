import React,{useEffect,useState} from 'react'
import { getAllUsers } from '../../api/AdminRequests'
import AdminBlockList from './AdminBlockList'
import AdminNav from './AdminNav'
import { useSelector } from 'react-redux'

const AdminUsers = () => {

  const [value,setValue] = useState()
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    const usersData = async () =>{
      const {data} = await getAllUsers()
      setValue(data)
    }
    usersData()
  }, [user])
  
  return (
    <div>
      <AdminNav />
     {value && <AdminBlockList user={value}/>}
    </div>
  )
}

export default AdminUsers