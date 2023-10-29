'use client'

import { useState } from "react"

const ForgotPassword = () => {

  const [userMessage, setUserMessage] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [heading, setHeading] = useState('reset password')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if(heading === 'email sent successfully')
        return

      if (userEmail === '') {
        setUserError('Enter the e-mail ID')
        return
      }
      setHeading('processing...')

      const response = await fetch(
        `/api/users/forgotPassword`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      )
      const data = await response.json()

      if (data.status !== 200){
         setUserMessage(data.error)
         setHeading('request failed')
      }
      else{
        setUserMessage('Check for the Email from us, click the url provided in email to change your password... :) ')
        setHeading('email sent successfully')
      }

    } catch (err) {
      console.log(err)
      setUserMessage('Something went wrong... Please try again after some time... :(')
    }
  }

  return (
    <section className="mx-2 md:mx-12  px-6 md:px-48 py-4 bg-background-100 dark:bg-gray-900 rounded-xl">
      <div className="space-y-2 md:space-y-5">
        <h1 className="text-3xl my-2 font-extrabold uppercase leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-black dark:text-white">
          {heading}
        </h1>
      </div>

      <div className="w-full">
        <form className="mt-2 " onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800 dark:text-primary-100"
            >
              Your Email
            </label>
            <input
              id="email"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              autoComplete='true'
              onChange={({ target }) => {
                setUserEmail(target.value)
                setUserMessage('')
              }}
            />
          </div>

          {userMessage &&
            <div className="my-4">
              <p className='text-gray-200 dark:text-gray-900 bg-gray-900 dark:bg-gray-200 px-4 text-xs w-fit mx-auto p-2 rounded-xl transition-all'>{userMessage}</p>
            </div>
          }

          <div className="mt-2">
            <button

              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-800 focus:outline-none focus:bg-primary-800"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      
      <p className="text-center mt-4 w-full md:w-1/2 mx-auto">Enter Your Registred and Verified Email-ID and submit. We will mail you the Unique URL to you, so that you can change your password securly... 😊</p>
    </section>
  )
}

export default ForgotPassword