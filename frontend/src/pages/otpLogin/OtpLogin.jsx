import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {BsFillShieldLockFill, BsTelephoneFill} from "react-icons/bs"
import {CgSpinner} from "react-icons/cg"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import {auth} from "./firebase.config"
import {RecaptchaVerifier} from 'firebase/auth'
import { Toaster } from 'react-hot-toast'
import { signInWithPhoneNumber } from "firebase/auth";
import axios from "axios"
import { useDispatch } from 'react-redux';
import { setLogin } from '../../redux/userData'
import CounterComponent from './CounterComponent'

export default function OtpLogin() {
   
    const [otp,setOtp] = useState("")
    const [ph,setPh] = useState("")
    const [loading,setLoading] = useState(false)
    const [showOTP,setShowOTP] = useState(false)
    const [user, setUser] = useState(null)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function onCaptchaVerify(){
        if(!window.recaptchaVerifier)
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container', 
                {
                'size': 'invisible',
                'callback': (response) => {
                    onSignup()
                },
                'expired-callback': () => {}
            }, auth);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_AXIOS_KEY}/otp_login`,{
                ph
            },
            {
                withCredentials:true,
            })
            if(data){
                dispatch(setLogin({user:data.user}))
                if(data.errors){
                    console.log(data.errors);
                }else{
                    onSignup();
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    function onSignup(){
        setLoading(true)
        onCaptchaVerify()

        const appVerifier = window.recaptchaVerifier

        const formatPh = '+' + ph
        signInWithPhoneNumber(auth, formatPh, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false)
            setShowOTP(true)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        });
    }

    function onOTPVerify(){
        setLoading(true)
        window.confirmationResult.confirm(otp).then(async(res)=>{
            setUser(res.user)
            setLoading(false)
            navigate("/")
        }).catch(err=>{
            console.log(err);
            setLoading(false)
        })
    }

  return (
    <section className='flex items-center bg-gray-900 justify-center h-screen'>
        <div>
        <Toaster toastOptions={{duration: 4000}} />
        <div id="recaptcha-container"></div>
        {
            user?            
            <h2 className='text-center text-white font-medium text-2xl'>
                Login Success
            </h2>:
            <div className='w-80 flex flex-col gap-4 rounded-lg p-4 border border-gray-800 bg-gray-800'>
                <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                    LOGIN THROUGH <br /> OTP
                </h1>
            {
                showOTP?
                    <>
                        <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                        <BsFillShieldLockFill size={30} />
                        </div>
                        <label htmlFor='otp' className='font-bold text-2x1 text-white text-center'>
                            Enter your OTP
                        </label>
                        <input className='p-2 rounded-xl bg-gray-900 text-gray-200' type="number" value={otp} onChange={(e)=>setOtp(e.target.value)} />
                        <button onClick={onOTPVerify} className='bg-gray-900 shadow-xl w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                            {loading && <CgSpinner size={20} className="mt-1 animate-spin"/>}
                            <span>Verify OTP</span>
                        </button>
                        <button onClick={()=>setShowOTP(false)}>
                            <CounterComponent seconds={60} />
                        </button>
                    </>:
                    <>
                        <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                        <BsTelephoneFill size={30} />
                        </div>
                        <label htmlFor='ph' className='font-bold text-x1 text-white text-center'>
                            Verify your Phone Number <br />
                            <p className='text-red-600 mt-2'>Please add your country Code</p>                            
                        </label>
                        <input className='p-2 rounded-xl bg-gray-900 text-gray-200' type="number" value={ph} onChange={(e)=>setPh(e.target.value)} required/>
                        <button onClick={handleSubmit} className='bg-gray-900 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded border border-gray-700'>
                            {loading && <CgSpinner size={20} className="mt-1 animate-spin"/>}
                            <span>Send Code via SMS</span>
                        </button>
                        <label htmlFor='ph' className='font-bold text-x1 text-white text-center'>
                            Register Your Phone Number ? <Link to="/Register">Register</Link>
                        </label>
                    </>
            }
            </div>
        }
        </div>
    </section>
    )
}
