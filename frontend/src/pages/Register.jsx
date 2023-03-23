import React, {useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import {ToastContainer,toast} from "react-toastify"
import axios from 'axios';

export default function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
        phoneno: ""
    });
    
    console.log(values);

    const generateError = (err) => toast.error(err,{
        position:"bottom-right"
    })

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const {data} = await axios.post("http://localhost:4000/register",{
                ...values
            },
            {
                withCredentials:true,
            })
            if(data){
                if(data.errors){
                    console.log(data.errors);
                    const {email,password,phoneno} = data.errors;
                    if(email) generateError(email)
                    else if(password) generateError(password)
                    else if(phoneno) generateError(phoneno)
                }else{
                    navigate("/")
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <section className='flex items-center bg-emerald-900 justify-center h-screen'>
    <div className='container'>
        <h2 className='text-center text-white font-medium text-2xl'>Register Account</h2>
        <form  onSubmit={(e)=>handleSubmit(e)}>
            <div class="relative mb-6" data-te-input-wrapper-init>
                {/* <label htmlFor='email'>Email</label> */}
                <input className='bg-white text-emerald-500 w-fit mx-auto p-2' type="email" name="email" placeholder='Email' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})}/>
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
                {/* <label htmlFor='password'>Password</label> */}
                <input className='bg-white text-emerald-500 w-fit mx-auto p-2' type="password" name="password" placeholder='Password' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            </div>
            <div class="relative mb-6" data-te-input-wrapper-init>
                {/* <label htmlFor='phoneno'>Phone Number</label> */}
                <input className='bg-white text-emerald-500 w-fit mx-auto p-2 rounded- ' type="phoneno" name="phoneno" placeholder='phoneno' onChange={(e)=>setValues({...values,[e.target.name]:e.target.value})} />
            </div>
            <button className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded' type='submit'>Submit</button>
            <span>
                Already have an account? <Link to="/login">Login</Link>
            </span>
        </form>
    <ToastContainer />
    </div>
    </section>
  )
}
