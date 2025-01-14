import React, { useEffect, useState } from 'react'
import { IoMdEye,IoMdEyeOff } from "react-icons/io"
import { FaGoogle } from "react-icons/fa";
import { FiGithub } from "react-icons/fi";
import { RiFacebookFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { gotoSignup } from '../../redux/action';
import { useLocation, useNavigate } from 'react-router-dom';

const initialValue = {
    username:'', 
    password:'',
    confirmPassword:'',
    email:''
}

const Signup = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const [formData, setFormData] = useState(initialValue)
    const [passwordType1 , setPasswordType1] = useState(false)
    const [passwordType2 , setPasswordType2] = useState(false)
    const auth = useSelector(store => store.reducer.auth)
    const [isPasswordMatched, setPasswordMatched] = useState(false)
    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault()
        if(formData.password !== formData.confirmPassword){
            setPasswordMatched(true)
            return 
        }
        dispatch(gotoSignup(formData))
        setFormData(initialValue)
    }
   
    const handleInput =(event) => {
        event.preventDefault()
        const {value, name} = event.target
        setFormData({...formData, [name]:value})
    }

    useEffect(()=> {
        if (auth) {
            navigate(from, { replace: true })
        }
    },[auth, navigate])

    const handleLoginClick = () => {
        navigate('/login' ,{ state: { from: location } }  )
    }

    const onConfirmPasswordChange = () => {
        if(formData.password !== formData.confirmPassword){
            setPasswordMatched(true)
        }else{
            setPasswordMatched(false)
        }
    }

    return (
        <div className='flex justify-center items-center mt-8 mb-4'>
            <div className='w-[400px] mb-10 pb-4 border border-0.5 border-neutral-700 text-center rounded-md'>
                <div className='w-full flex  justify-center items-center flex-col mt-8'> 
                    <img  src='https://upload.wikimedia.org/wikipedia/commons/8/8e/LeetCode_Logo_1.png' className='w-16 h-16'  alt='link'/>
                    <h1 className='text-2xl italic'>LeetCode</h1>
                </div>
                <form onSubmit={handleSubmit} className='grid gap-6 grid-cols-1 mt-10 text-black'>
                    <div className='w-full cursor-pointer'>
                        <input
                            placeholder='Username'
                            name= 'username'
                            value={formData.username}
                            onChange={handleInput}
                            required={true}
                            className='w-10/12 p-2 border border-2 outline-none rounded-md text-sm'
                        />
                    </div>
                    <div className='w-full  '>
                        <div className='w-10/12 bg-white p-2 flex justify-between m-auto items-center border border-2 outline-none rounded-md'>
                            <input
                                placeholder= 'Password'
                                name='password'
                                value={formData.password}
                                onChange={handleInput}
                                required={true}
                                type={ passwordType1 ? 'text': 'password' }
                                className='outline-none bg-white text-sm'
  
                            />
                            <div className='cursor-pointer' onClick={() => setPasswordType1(!passwordType1)}>
                               { passwordType1 ? <IoMdEyeOff size={20} color='black'/> : <IoMdEye color='black' size={20}/>}
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className='w-10/12 bg-white p-2 flex justify-between m-auto items-center border border-2 outline-none rounded-md'>
                            <input
                                placeholder= 'Confirm Password'
                                name='confirmPassword'
                                value={formData.confirmPassword}
                                onChange={handleInput}
                                onBlur={onConfirmPasswordChange}
                                required={true}
                                type={ passwordType2 ? 'text': 'password' }
                                className='outline-none bg-white text-sm'
  
                            />
                            <div className='cursor-pointer' onClick={() => setPasswordType2(!passwordType2)}>
                               { passwordType2 ? <IoMdEyeOff size={20} color='black'/> : <IoMdEye color='black' size={20}/>}
                            </div>
                        </div>
                        {isPasswordMatched && <div className='text-left w-10/12 m-auto text-red-500 text-sm mt-2'>The passwords you entered do not match.</div>}
                    </div>
                    <div className='w-full cursor-pointer'>
                        <input
                            placeholder='E-mail address'
                            name= 'email'
                            value={formData.email}
                            onChange={handleInput}
                            type='email'
                            required={true}
                            className='w-10/12 p-2 border border-2 outline-none rounded-md text-sm'
                        />
                    </div>
                    <div className='w-full text-white'>
                        <input
                            value="Sign Up"
                            type='submit'
                            className='w-10/12 p-3 bg-blue-500 cursor-pointer outline-none rounded-md'
                        />
                    </div>
                </form>
                <div className='flex justify-center gap-2 w-10/12 m-auto mt-6 text-gray-400'>
                    <div className='cursor-pointer'>Have an account?</div>
                    <div className='cursor-pointer' onClick={handleLoginClick} >Sign In</div>
                </div>
                <div className='mt-6'>
                    <div className='text-gray-400 '>or you can sign in with</div>
                    <div className='w-full flex justify-center items-center gap-6 mt-4'>
                        <div className='w-8 h-8 rounded-full bg-stone-500 flex items-center justify-center hover:bg-red-700 cursor-pointer'>
                           <FaGoogle />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-stone-500 flex items-center justify-center hover:bg-neutral-800 cursor-pointer'>
                            <FiGithub />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-stone-500 flex items-center justify-center hover:bg-blue-500 cursor-pointer'>
                            <RiFacebookFill />
                        </div>
                        <div className='w-8 h-8 rounded-full bg-stone-500 flex items-center justify-center hover:bg-neutral-800 cursor-pointer'>
                            <BsThreeDots />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
