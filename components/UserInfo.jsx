'use client'

import React from 'react'
import { signOut, useSession } from 'next-auth/react'

function UserInfo() {

    const {data:session} = useSession()

  return (
    <div className='h-screen flex items-center justify-center'>
        <div className='shadow-lg p-8 bg-zinc-300/10 flex 
        flex-col gap-2 my-6'>
            <div>
                Name: <span className='font-bold'>{session?.user?.name}</span>
            </div>
            <div>
                Email: <span className='font-bold'>{session?.user?.email}</span>
            </div>
            <button
            onClick={()=>signOut()} 
            className='
            text-white
            py-1
            rounded-md
            bg-red-600'
            >Log Out
            </button>
        </div>
    </div>
  )
}

export default UserInfo