import React,{useState,useEffect} from 'react'
import { getNameUser } from '../../api/NameRequests'
import { useDispatch, useSelector } from 'react-redux';
import { setSearch,setLogin } from '../../redux/userData';
import { Navigate, useNavigate } from 'react-router-dom';

const NameComponent = (props) => {
  
  const userId = props
  const reUserId = userId?.userId
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [name,setName] = useState()
  const [lastName,setLastName] = useState()
  const user = useSelector((state)=>state.user)

  useEffect(() => {
    const getUserName = async ()=>{
      const {data} = await getNameUser(userId)
      setName(data.name)
      setLastName(data.lastName)
    }
    getUserName() 
  }, [])

  const handleSearch=()=>{
    dispatch(setSearch({search:reUserId}))
    localStorage.setItem("targetId",reUserId)
    navigate('/searchPage')
  }
  
  return (
    <div onClick={handleSearch}>
      {name} {lastName}
    </div>
  )
}

export default NameComponent