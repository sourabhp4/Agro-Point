
import { BsFillLockFill } from 'react-icons/bs'
import SignInButton from './SignIn/SignInButton'

const ContentLock = () => {
  return (
    <div className='h-[25vh] flex flex-col gap-6 rounded-3xl p-8 mx-4 sm:mx-12 items-center bg-background-100 dark:bg-gray-900'>
      <BsFillLockFill />
      <SignInButton buttonText={'Sign In to View'} />
    </div>
  )
}

export default ContentLock