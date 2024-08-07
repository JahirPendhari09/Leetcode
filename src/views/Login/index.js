import React, { useRef, useState } from 'react'
import { IoMdEye,IoMdEyeOff } from "react-icons/io"


const Login = () => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [passwordType , setPasswordType] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        const userData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }
        console.log('login data', userData)
    }
    return (
        <div className='flex justify-center items-center h-screen '>

            <div className='w-[400px] h-[400px] border border-2 text-center rounded-md'>
                <h1 className='text-2xl'>Leet Code</h1>
                <form onSubmit={handleSubmit} className='grid gap-5 grid-cols-1'>
                    <div className='w-full cursor-pointer'>
                        <input
                            placeholder='Enter E-mail'
                            ref={emailRef}
                            type='email'
                            required={true}
                            className='w-10/12 p-3 border border-2 outline-none rounded-md'
                        />
                    </div>
                    <div className='w-full cursor-pointer'>
                        <div className='w-10/12 p-3 flex justify-between m-auto items-center border border-2 outline-none rounded-md'>
                            <input
                                placeholder= 'Password'
                                ref={passwordRef}
                                required={true}
                                type={ passwordType ? 'text': 'password' }
                                className='outline-none'
                                
                            />
                            <div className='' onClick={() => setPasswordType(!passwordType)}>
                               { passwordType ? <IoMdEyeOff size={20}/> : <IoMdEye  size={20}/>}
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-full'>
                        <input
                            value="Sign In"
                            type='submit'
                            className='w-10/12 p-3 border border-2 cursor-pointer outline-none rounded-md'
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
