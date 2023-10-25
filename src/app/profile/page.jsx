
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

import SignInButton from '@/components/SignIn/SignInButton'

import { BsFillLockFill } from 'react-icons/bs'
// import AdminProfile from '@/components/AdminProfile'
import Profile from '@/components/Profile'

const ProfileComponent = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      <div className="space-y-2 pb-8 pt-6">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
          YOUR PROFILE
        </h1>
      </div>
      {session ? 
        <Profile />
        :
        <div className='h-[35vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-700 dark:to-black light:to-white'>
          <BsFillLockFill />
          <SignInButton buttonText={'Sign In to View'} />
        </div>
      }
    </>
  )
}

export default ProfileComponent