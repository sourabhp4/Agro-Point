
import { getServerSession } from 'next-auth/next'

import { authOptions } from './api/auth/[...nextauth]/route'

import Home from '../components/Home'
import Public from '../components/Public'

const Page = async () => {
  const session = await getServerSession(authOptions)
  return (
    <>
      {
        !session ? <Public />
        :
        <Home />
      }
    </>
  )
}

export default Page