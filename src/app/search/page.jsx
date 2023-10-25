'use client'

import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { useSession } from 'next-auth/react'

import { BsFillLockFill } from 'react-icons/bs'
import SignInButton from '@/components/SignIn/SignInButton'

const Search = () => {

  const { data: session } = useSession()

	const handleSubmit = (e) => {
		e.preventDefault()
	}

  return (
    <>
		<div className="flex justify-center items-center mt-4">
			<div className="container mx-auto bg-background-100 dark:bg-gray-900 rounded-lg p-4">
				<form onSubmit={(e) => handleSubmit(e)}>
					<h1 className="text-center font-bold mb-4 text-gray-700 dark:text-background-100 text-2xl">What&apos;s in your mind ?... </h1>

					<div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-2 justify-between">
						<input className="text-base text-gray-600 bg-white flex-grow outline-none px-2 " type="text" placeholder="Search ..." />
						<div className="rounded-lg space-x-4 mx-auto ">
							<button className="bg-primary-800 text-gray-200 text-base rounded-lg px-4 py-2 font-thin">
								<BsFillArrowRightCircleFill />
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
		{session ?
			<></>
			:
			<div className='h-[25vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-300 dark:to-black light:to-white'>
				<BsFillLockFill />
				<SignInButton buttonText={'Sign In to View'} />
			</div>
			
		}
    </>
  )
}

export default Search