
'use client'


import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginForm() {

        const[email,setEmail] = useState("")
        const[password,setPassword] = useState("")
        const[error,setError] = useState("")
        const router = useRouter()


        const handleSubmit = async (e)=>{
            e.preventDefault()
            try {
              const res =  await signIn("credentials",{
                    email ,password , redirect:false
                })
                if(res.error){
                    setError("invalid Credentials")
                }
                router.replace('dashboard')
            } catch (error) {
                console.log(error)
            }
        }

  return (
    <div className='h-screen flex items-center justify-center'>
    <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Entar The Details</h1>


        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input onChange={(e)=>setEmail(e.target.value)} className='w-[400px] border px-2 py-2 outline-none rounded-md' type="text" placeholder='Email' />
            <input onChange={(e)=>setPassword(e.target.value)} className='w-[400px] border px-2 py-2 outline-none rounded-md' type="password" placeholder='Password' />
            <button className='bg-green-600 text-white 
            font-bold rounded-md cursor-pointer px-6 py-2'>Login</button>
            {
                error && (
            <div className='bg-red-500 
            text-white w-fit text-sm py-1 px-3 
            rounded-md mt-2'>
                {error}
            </div>
                )
            }
            
            <span className='text-center mt-1 text-sm'>
                Don't have an account? <Link 
                className='text-blue-600 underline' 
                href={'/register'}>Register</Link>
            </span>
        </form>
    </div>
</div>
  )
}

export default LoginForm