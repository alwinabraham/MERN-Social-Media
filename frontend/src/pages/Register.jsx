import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/userData';

export default function Register() {

    const [name, setName] = useState("")
    const [lastName,setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [file, setFile] = useState()
    const [password, setPassword] = useState("")
    const [repeatPassword,setRepeatPassword] = useState("")
    const [phoneno,setPhoneno] = useState()
    const dispatch = useDispatch();
    
    const navigate = useNavigate();

    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const handleSubmit = async e =>{
        e.preventDefault()

        if(!name || !lastName || !email || !password || !repeatPassword || !phoneno){
            generateError("Please fill in all fields")
            return
        }
        if(!email.includes('@')){
            generateError("Please enter a valid email address")
            return
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            generateError("Please enter a valid email address");
            return;
        }
        if (password !== repeatPassword) {
            generateError("Passwords do not match")
            return
          }
        if (!/^[a-zA-Z]+$/.test(name) || !/^[a-zA-Z]+$/.test(lastName)) {
            generateError("Name and last name should contain only letters");
            return;
        }
  
        const formData = new FormData();
        formData.append("name", name)
        formData.append("lastName",lastName)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("phoneno", phoneno)
        formData.append("image", file)
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/register`, formData ,{ headers: {'Content-Type': 'multipart/form-data'}})
            if(data){
                if(data.errors){
                    const {name,lastName,email,password,phoneno,image} = data.errors;
                    if(name) generateError(name)
                    else if(lastName) generateError(lastName)
                    else if(email) generateError(email)
                    else if(password) generateError(password)
                    else if(phoneno) generateError(phoneno)
                    else if(image) generateError(image)
                }else{
                    dispatch(setLogin({user:data.user}))
                    navigate("/")
                }
            }
            }catch (error) {
            console.log(error);
        }
    }

    const fileSelected = event => {
        const file = event.target.files[0]
            setFile(file)
      }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
    <div className='w-96 p-6 shadow-lg bg-gray-800 rounded-md'>
        <h1 className='text-3xl block text-center font-semibold text-gray-200 pb-3'>Register</h1>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
            <label htmlFor="name" className='block mb-2 text-gray-200'>First Name</label>
            <input type="name" name="name" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='First Name' value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="name" className='block text-gray-200 mb-2'>Last Name</label>
            <input type="name" name="name" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='Last Name' value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="email" className='block text-gray-200 mb-2'>Email</label>
            <input type="email" name="email" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="password" className='block text-gray-200 mb-2'>Password</label>
            <input type="password" name="password" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="repeatPassword" className='block text-gray-200 mb-2'>Repeat Password</label>
            <input type="password" name="repeatPassword" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='Repeat Password' value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)} />
        </div>
        <div className='mb-3'>
            <label htmlFor="phoneno" className='block text-gray-200 mb-2'>Phone Number (Enter your Country Code)</label>
            <input type="phoneno" name="phoneno" 
            className='border w-full text-gray-200 px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700 border-gray-700' 
            placeholder='Phone No' value={repeatPassword} onChange={(e)=>setPhoneno(e.target.value)} />
        </div>
        <div className="flex border bg-gray-700 border-gray-700 my-4 rounded-xl">
            <input id="fileInput" onChange={fileSelected} type="file" accept="image/*" className='hidden'></input>
            <label htmlFor="fileInput" className="cursor-pointer flex gap-3 p-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
                <p className='dark:text-gray-200'>
                 Click And Your Profile Picture
                </p>
            </label>
        </div>
        <div className='flex justify-between items-center'>
            <div className='text-gray-300'>
            Already have an account? <Link to="/login">Login</Link>
            </div>
        </div>
        <div className="mt-5">
            <button type='submit' className='border-2 border-gray-900 bg-gray-900 text-white py-1 px-5 w-full rounded-md h hover:text-gray-500 font-semibold'>Register</button>
        </div>
        </form>
    </div>
    <ToastContainer />
</div>
  )
}
