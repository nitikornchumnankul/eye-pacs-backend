import React, { useState, useEffect } from 'react'

// Routes
import { useNavigate } from 'react-router-dom'

// Icons
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineKey } from 'react-icons/hi'
import { BiError } from 'react-icons/bi'

// Services
import { login } from '../services/userServices'

// Redux state
import { useSelector, useDispatch } from 'react-redux'
import { loginFail, loginLoading, loginSuccess } from '../features/loginSlice'

export const Login = () => {

    // Route
    const navigate = useNavigate()

    // React state
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // Redux state
    const dispatch = useDispatch()
    const { isAuth, isLoginLoading, isLoginErrors } = useSelector((state) => state.login)

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        dispatch(loginLoading())
        try {
            const res = await login(username, password)
            dispatch(loginSuccess(res))
        } catch(e) {
            dispatch(loginFail(e.message))
        }
    }

    useEffect(() => {
        if(isAuth || localStorage.getItem("accessToken")) {
            navigate('home')
        }
    }, [isAuth])

    return (
        <div className='flex'>
            <div className='hidden md:flex'>
                <img className="object-cover h-screen sticky" src="./assets/images/login/doctor.jpg" alt="cover" />
            </div>
            <div className='max-w-xl mx-auto max-h-screen my-auto'>
                <div className='flex flex-col items-center space-y-10'>
                    {/* Logo */}
                    <div>
                        <img className='w-auto h-56' src="./assets/images/login/SUT_logo.jpg" alt="sut-logo" />
                    </div>
                    
                    {/* Header */}
                    <div className='flex flex-col space-y-3'>
                        <div className='text-center text-3xl'>
                            Welcome back
                        </div>
                        <div className='text-center font-bold text-4xl'>
                            Login to your account
                        </div>
                    </div>

                    {/* Login-Form */}
                    <form onSubmit={onSubmitHandle} className='flex flex-col space-y-6 w-full'>
                        {/* Username */}
                        <div className='flex space-x-3 items-center'>
                            <AiOutlineUser className='w-12 h-12' />
                            <input onChange={(e) => setUsername(e.target.value)} className='w-full py-2 px-4 text-3xl border-b-4 border-gray-400 focus:border-black focus:outline-none' type="text" placeholder='Username'/>
                        </div>

                        {/* Password */}
                        <div className='flex space-x-3'>
                            <HiOutlineKey className='w-12 h-12' />
                            <input onChange={(e) => setPassword(e.target.value)} className='w-full py-2 px-4 text-3xl border-b-4 border-gray-400 focus:border-black focus:outline-none' type="password" placeholder='Password'/>
                        </div>

                        {/* Error */}
                        {isLoginErrors &&
                            <div className='flex items-center space-x-2'>
                                <BiError className='w-6 h-6 text-red-500'/>
                                <div className='text-xl text-red-500'>
                                    Please check your username or password.
                                </div>
                            </div>
                        }

                        {/* Button */}
                        <div className='pt-12'>
                            <button disabled={isLoginLoading} type="submit" className='w-full bg-orange-400 rounded-full hover:bg-orange-300 disabled:bg-orange-300 shadow-xl'>
                                <div className='text-3xl font-bold p-3'>
                                    {isLoginLoading? 'Pending...' : 'Login' }
                                </div>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
