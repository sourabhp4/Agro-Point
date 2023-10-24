'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { BiUserCircle } from 'react-icons/bi'

import SignIn from './SignIn'
import Register from './Register'
import Modal from '../Modal'

const SignInProfile = forwardRef ((props, ref) => {
  const [isNavOpen, setNavOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const { data: session } = useSession()

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

  return (
    <>
      {isModalOpen && <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <SignIn closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} />
          <Register closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} />
      </Modal>}
      {session ? (
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
      ) : (
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
