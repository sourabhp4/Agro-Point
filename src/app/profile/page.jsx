
import { getServerSession } from 'next-auth/next'
import { authOptions } from '../api/auth/[...nextauth]/route'

// import AdminProfile from '@/components/AdminProfile'
import Profile from '@/components/Profile'
import ContentLock from '@/components/ContentLock'

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
        <ContentLock />
      }
    </>
  )
}

export default ProfileComponent