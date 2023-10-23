'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BsFillLockFill } from 'react-icons/bs'
import SignInButton from '@/components/SignIn/SignInButton'

const Blog = () => {
  const router = useRouter()
  const blogId = router.query?.blogId

  const { data: session } = useSession()

  return (
    <>
      <div>
          <h1 className='text-center'>Blog Specific Page</h1>
        {session ? 
          <h1>Blog Content</h1>
          :
          <div className='h-[35vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-700 dark:to-black light:to-white'>
            <BsFillLockFill />
            <SignInButton buttonText={'Sign In to View'} />
          </div>
        }
      </div>
    </>
  )
}

export default Blog