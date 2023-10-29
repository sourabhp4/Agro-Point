'use client'

import Profile from '@/components/Profile'
import ContentLock from '@/components/ContentLock'
import useAuth from '@/lib/useAuth'

import { useState, useEffect } from 'react'

const ProfileComponent = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  const { status, user } = useAuth()

  useEffect(() => {
    setIsAuthenticated(status)
    setUserData(user)
  }, [status, user])
  
  return (
    <>
      <div className="space-y-2 pb-8 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
          YOUR PROFILE
        </h1>
      </div>
      {isAuthenticated ?
        <Profile user={user} />
        :
        <ContentLock />
      }
    </>
  )
}

export default ProfileComponent