'use client'


import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {

        const[name,setName] = useState("")
        const[email,setEmail] = useState("")
        const[password,setPassword] = useState("")
        const[error,setError] = useState('')
        const router = useRouter()

        const handleSubmit = async (e)=>{
            e.preventDefault()
            if(!name || !email || !password){
                return (
                    setError("All fields are necessary.")
                )
            }


            try {
            // for user exsist
                const resUserExists = await fetch("api/userExists",{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({email})
                });

                const {user} = await resUserExists.json()
            // for user exsist
                if(user){
                    setError("User Already exists")
                }else{
                    const res =  await fetch("api/register",{
                        method:"POST",
                        headers:{
                            'Content-Type':"application/json"
                        },
                        body: JSON.stringify({
                            name,email,password
                        })
                    })
    
                    if(res.ok){
                        const form = e.target
                        form.reset();
                        router.push("/")
                    }else{
                        console.log("user registeration failed")
                    }
                }

               
            } catch (error) {
                setError("Something wrong Please try later")
            }
        }

  return (
  
    <div className='h-screen flex items-center justify-center'>
    <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
        <h1 className='text-xl font-bold my-4'>Register</h1>


        <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input onChange={(e)=>setName(e.target.value)} className='w-[400px] border px-2 py-2 outline-none rounded-md' type="text" placeholder='Name' />
            <input onChange={(e)=>setEmail(e.target.value)} className='w-[400px] border px-2 py-2 outline-none rounded-md' type="email" placeholder='Email' />
            <input onChange={(e)=>setPassword(e.target.value)} className='w-[400px] border px-2 py-2 outline-none rounded-md' type="password" placeholder='Password' />
            <button className='bg-green-600 text-white 
            font-bold rounded-md cursor-pointer px-6 py-2'>Register</button>
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
                Already have an account? <Link 
                className='text-blue-600 underline' 
                href={'/'}>Login</Link>
            </span>
        </form>
    </div>
</div>
  )
}

export default Register