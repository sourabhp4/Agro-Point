'use client'

import Link from 'next/link'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { BiUserCircle } from 'react-icons/bi'

import SignIn from './SignIn'
import Register from './Register'
import Modal from '../Modal'

import useAuth from '@/lib/useAuth'

const SignInProfile = forwardRef((props, ref) => {
  const [isNavOpen, setNavOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useState(async () => {
    const { status } = await useAuth()
    setIsAuthenticated(status)
  })

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const divRef = useRef(null)

  useEffect(() => {
    function handleDocumentClick(e) {
      if (isNavOpen && divRef.current && !divRef.current.contains(e.target)) {
        setNavOpen(false)
      }
    }

    document.addEventListener('click', handleDocumentClick)

    return () => {
      document.removeEventListener('click', handleDocumentClick)
    }
  }, [isNavOpen])

  useImperativeHandle(ref, () => ({
    toggleMenu: () => setNavOpen(!isNavOpen),
  }))

  const signOut = async () => {
    const response = await fetch(
      `/api/users/signOut`, { method: "GET" }
    )
    const data = await response.json()

    if (data.status === 200)
      window.location.reload()

  }

  return (
    <>
      {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <SignIn closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} isAuthenticated={isAuthenticated} />
        <Register closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} isAuthenticated={isAuthenticated} />
      </Modal>}
      {isAuthenticated ?
        <>
          <BiUserCircle
            className='text-gray-900 dark:text-gray-100 text-2xl hover:scale-125 transition-all hidden md:block'
            onClick={() => setNavOpen(!isNavOpen)}
          />
          {isNavOpen &&
            <div ref={divRef} className="z-10 absolute top-16 right-14 bg-gray-300 divide-y divide-gray-100 rounded-lg shadow w-34 dark:bg-gray-700 dark:divide-gray-600 hidden md:block">
              <div className="py-2 text-sm text-gray-700 dark:text-gray-400">
                <Link
                  href="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white transition-all"
                  onClick={() => {
                    setNavOpen(false)
                  }}
                >
                  View Profile
                </Link>
              </div>
              <div className="py-2 text-sm text-gray-700 dark:text-gray-400">
                <p
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setNavOpen(false)
                    signOut()
                  }}
                >
                  Sign Out
                </p>
              </div>
            </div>
          }
        </>
       : (
        <>
          <button
            className="font-medium text-gray-900 dark:text-gray-100 bg-green-600 p-2 rounded 
                hover:bg-primary-100 hover:scale-110 transition-all hidden md:block"
            onClick={() => setIsModalOpen(true)}
          >
            Sign In
          </button>
        </>
      )}
    </>
  )
})

SignInProfile.displayName = 'SignInProfile'

export default SignInProfile

// export async function getServerSideProps(context) {
//   console.log('signinprofile',context)
//   const response = await fetch(
//     `/api/users/checkAuthenticated`, { method: "GET" }
//   )
//   const data = await response.json()
//   const props = { isAuthenticated: false }
//   if (data.status === 200)
//     props.isAuthenticated = true

//   return {
//     props: props,
//   }
// }
