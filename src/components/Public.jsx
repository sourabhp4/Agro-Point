'use client'

import SignInButton from './SignIn/SignInButton'

const Public = () => {

  return (
    <>
      <div className='max-w-[1100px] w-full m-auto py-4 px-2 relative flex flex-col items-center'>
        <h1>Public home</h1>
        <div className='my-4'>
          <SignInButton buttonText={'Get Started'} />
        </div>
     </div>
    </>
  )
}

export default Public