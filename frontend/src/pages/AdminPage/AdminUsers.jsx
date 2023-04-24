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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <AdminNav />
      <div style={{ marginTop: '5rem', alignSelf: 'center'}}>
      {value && <AdminBlockList user={value}/>}
      </div>
    </div>
  )
}

export default AdminUsers