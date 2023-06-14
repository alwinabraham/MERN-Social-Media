import React, {useState, useEffect} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';
import {useCookies} from 'react-cookie'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/userData';

export default function Login() {

    const [cookies,setCookie,removeCookie] = useCookies([])
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors },
     } = useForm()

    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const onSubmit = async (values) => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/login`, {
                ...values
            },
                {
                    withCredentials: true,
                })
            if (data) {
                if (data.error) {
                    const { email, password } = data.error;
                    if (email) generateError(email)
                    else if (password) generateError(password)
                } else {
                    dispatch(setLogin({ user: data.user }))
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    const verifyUser=()=>{
        if(!cookies.jwt){
            navigate("/login")
        }else{
            navigate("/")
        }
    }

    useEffect(() => {
        verifyUser();
    },[cookies])
    

  return (
    <>
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-900 to-violet-900 ...">
        <div className='w-96 p-6 shadow-xl bg-gray-800 rounded-md'>
            <h1 className='text-3xl block text-center text-gray-200 pb-3 font-semibold'>ALWO.LOGIN</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mb-3'>
                <label htmlFor="email" className='block mb-2 text-gray-200'>Email</label>
                <input type="email" name="email" className='border border-gray-600 text-gray-200 w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700' placeholder='Email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                {...register("email", {
                    required: "email is required",
                    pattern: {
                        value: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/,
                        message: "invalid email ",
                    },
                })}
                />
                <p className='text-sm text-red-700'>{errors.email?.message}</p>
            </div>
            <div className='mb-3'>
                <label htmlFor="password" className='block text-base mb-2 text-gray-200'>Password</label>
                <input type="password" name="password" className='border border-gray-600 text-gray-200 w-full text-base px-2 py-2 focus:outline-none focus:ring-0 focus:border-gray-600 rounded-full bg-gray-700' placeholder='Password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}
                {...register("password", {
                    required: "password is required",
                    pattern: {
                        value: /^(?=.*[a-zA-Z0-9]).{3,14}$/,
                        message: "password must be 3 to 14 characters ",
                    },
                })}
                />
                <p className='text-sm text-red-700'>{errors.password?.message}</p>
            </div>
            <div className='mt-3 flex justify-between items-center'>
                <div>
                    <Link to="/register"><p className='text-gray-200'>Register</p></Link>
                </div>
                <div>
                    <Link to="/otp_login"><p className='text-gray-200'>Otp-Login</p></Link>
                </div>
            </div>
            <div className="mt-5">
                <button type='submit' className='border-2 border-gray-900  bg-gray-900 text-white py-1 px-5 w-full rounded-md hover:bg-transparent hover:text-emerald-700 font-semibold'>Login</button>
            </div>
            </form>
        </div>
    </div>
    <ToastContainer />
    </>
  )
}
