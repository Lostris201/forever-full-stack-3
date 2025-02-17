import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {

  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name,setName] = useState('')
  const [password,setPasword] = useState('')
  const [email,setEmail] = useState('')

  const onSubmitHandler = async (event) => {
      event.preventDefault();
      try {
        if (currentState === 'Sign Up') {
          
          const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        } else {

          const response = await axios.post(backendUrl + '/api/user/login', {email,password})
          if (response.data.success) {
            setToken(response.data.token)
            localStorage.setItem('token',response.data.token)
          } else {
            toast.error(response.data.message)
          }

        }


      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
  },[token])

  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg'>
            <div className='text-center'>
                <h2 className='text-3xl font-bold text-gray-900'>
                    {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className='mt-2 text-sm text-gray-600'>
                    {currentState === 'Login' 
                        ? "Please sign in to your account" 
                        : "Fill in your information to create an account"}
                </p>
            </div>

            <form onSubmit={onSubmitHandler} className='mt-8 space-y-6'>
                <div className='space-y-4'>
                    {/* Form inputs with modern styling */}
                    {currentState === 'Sign Up' && (
                        <input
                            type="text"
                            required
                            className='appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/10'
                            placeholder='Full Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    )}
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required/>
                    <input onChange={(e)=>setPasword(e.target.value)} value={password} type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required/>
                </div>

                <div className='flex items-center justify-between'>
                    <button
                        type="submit"
                        className='group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-black hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black/5'
                    >
                        {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login
