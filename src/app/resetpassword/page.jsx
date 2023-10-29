'use client'

import NotFound from "@/components/NotFound"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

import Link from 'next/link'

const VerifyEmail = () => {

	const [heading, setHeading] = useState('change password')
	const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false)
	const [userMessage, setUserMessage] = useState('')

	const [isLoading, setIsLoading] = useState(false)
	const [isError, setIsError] = useState(false)
	const [isCompleted, setIsCompleted] = useState(false)

	const [userPass, setUserPass] = useState({
		newPassword: '',
		newRePassword: '',
	})

	const params = useSearchParams()
	const token = params.get('token')

	const verifyResetToken = async () => {
		try {
			const response = await fetch(
				`/api/users/verifyResetPassword`,
				{
					method: "POST",
					headers: {
						Accept: "Application/json",
						"Content-Type": "Application/json",
					},
					body: JSON.stringify({ token }),
				}
			)
			const data = await response.json()
			if (data.status !== 200)
				setIsError(true)
			else
				setIsLoading(false)
		} catch (error) {
			setIsError(true)
		}
	}

	useState(() => {
		verifyResetToken()
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			if (userPass.newPassword === '') {
				setUserMessage('Complete all fields')
				return
			}

			if (userPass.newPassword.length < 8) {
				setUserMessage('Length of the Password must atleast be 8 characters')
				return
			}

			if (!/[a-z]/.test(userPass.newPassword)) {
				setUserMessage('Password must contain at least one lowercase letter')
				return
			}

			if (!/[A-Z]/.test(userPass.newPassword)) {
				setUserMessage('Password must contain at least one uppercase letter')
				return
			}

			if (!/[!@#$%^&*]/.test(userPass.newPassword)) {
				setUserMessage('Password must contain at least one special symbol (!@#$%^&*)')
				return
			}

			if (userPass.newPassword !== userPass.newRePassword) {
				setUserMessage('Both passwords should match')
				return
			}

			setIsLoading(true)

			const response = await fetch(
				`/api/users/resetPassword`,
				{
					method: "POST",
					headers: {
						Accept: "Application/json",
						"Content-Type": "Application/json",
					},
					body: JSON.stringify({ token, newPassword: userPass.newPassword }),
				}
			)
			const data = await response.json()
			setIsLoading(false)
			if (data.status === 400) setIsError(true)
			else if (data.status !== 200) setUserMessage(data.error)
			else setIsCompleted(true)

		} catch (err) {
			console.log(err)
			setUserMessage('Something went wrong... Try again')
		}
	}

	const togglePasswordNew = () => {
		setIsNewPasswordVisible((prevState) => !prevState)
	}

	return (
		<>
			{token ?
				<>
					{!isError && isLoading && !isCompleted &&
						<div className="bg-background-100 dark:bg-gray-900 p-4 mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
							<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
								LOADING ⌛
							</h1>
							<p className="text-center text-black dark:text-primary-200">
								<b>Please don&apos;t close this window.</b>
							</p>
							<p className="text-center text-black dark:text-primary-200">
								Your request for RESET PASSWORD is under progress...
							</p>
						</div>
					}
					{!isError && !isLoading && isCompleted &&
						<div className="bg-background-100 dark:bg-gray-900 p-4 mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
							<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-600 dark:text-white">
								PASSWORD RESET SUCCESSFUL 🥳
							</h1>
							<p className="text-center text-black dark:text-primary-200">
								...😊👍
							</p>
							<div className="mt-4">
								<Link
									href='/'
									className="bg-gray-900 text-gray-200 dark:bg-white dark:text-black p-2 rounded"
								>
									Backto Home
								</Link>
							</div>
						</div>
					}
					{!isError && !isLoading && !isCompleted &&
						<>
							<div className="px-4 md:px-12 bg-background-100 dark:bg-gray-900 py-4 mx-4 rounded">
								<div className="space-y-2 md:space-y-5">
									<h1 className="text-3xl my-2 font-extrabold uppercase leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-black dark:text-white">
										{heading}
									</h1>
								</div>
								<form className="mt-2 w-full sm:w-4/5 mx-auto" onSubmit={handleSubmit}>
									<div className="mb-2">
										<label
											htmlFor="newPassword"
											className="block text-sm font-semibold text-gray-800 dark:text-gray-100"
										>
											New Password
										</label>
										<div className="flex flex-row justify-between items-center w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
											<input
												id="newPassword"
												type={isNewPasswordVisible ? "text" : "password"}
												autoComplete='true'
												value={userPass.newPassword}
												className='w-full mr-1 focus:outline-none bg-white'
												onChange={({ target }) => {
													setUserPass({ ...userPass, newPassword: target.value })
													setUserMessage('')
												}}
											/>
											<label
												onClick={togglePasswordNew}
												htmlFor="newPassword"

											>
												{isNewPasswordVisible ? (
													<AiFillEyeInvisible className='text-black' />
												) : (
													<AiFillEye className='text-black' />
												)}
											</label>
										</div>
									</div>

									<div className="mb-4">
										<label
											htmlFor="newRePassword"
											className="block text-sm font-semibold text-gray-800 dark:text-gray-100"
										>
											Re-Enter New Password
										</label>
										<input
											id="newRePassword"
											type="password"
											className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
											autoComplete='true'
											value={userPass.newRePassword}
											onChange={({ target }) => {
												setUserPass({ ...userPass, newRePassword: target.value })
												setUserMessage('')
											}}
										/>
									</div>

									{userMessage &&
										<div className="mb-4">
											<p className='text-gray-200 dark:text-gray-900 bg-gray-900 dark:bg-gray-200 px-4 text-xs w-fit mx-auto p-2 rounded-xl transition-all'>{userMessage}</p>
										</div>
									}

									<div className="mt-2 mb-4">
										<button
											className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
										>
											Submit
										</button>
									</div>
								</form>
							</div>
						</>
					}
					{isError &&
						<div className="bg-background-100 dark:bg-gray-900 p-4 mx-2 sm:mx-12 rounded-2xl h-[50vh] flex flex-col items-center justify-center">
							<h1 className="text-3xl mb-2 font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
								❌
							</h1>
							<h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-primary-400 dark:text-white">
								INVALID TOKEN
							</h1>
							<p className="text-center text-black dark:text-primary-200">
								<b>Please consider rechecking the RECENT Email sent by us for Reset Password.</b>
							</p>
							<div className="mt-4">
								<Link
									href='/forgotPassword'
									className="bg-gray-900 text-gray-200 dark:bg-white dark:text-black p-2 rounded"
								>
									Send Email Again
								</Link>
							</div>
						</div>
					}
				</>
				:
				<NotFound />
			}
		</>
	)
}

export default VerifyEmail