'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { BiUserCircle } from 'react-icons/bi'

import SignIn from './SignIn'
import Modal from '../Modal'

const SignInProfile = forwardRef ((props, ref) => {
  const [isNavOpen, setNavOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <SignIn closeModal={closeModal} />
      </Modal>
      {session ? (
        <>
          <BiUserCircle
            className='text-gray-900 dark:text-gray-100 text-2xl hover:scale-125 transition-all'
            onClick={() => setNavOpen(!isNavOpen)}
          />
          {isNavOpen &&
            <div ref={divRef} className="z-10 absolute top-24 right-16 bg-gray-300 divide-y divide-gray-100 rounded-lg shadow w-34 dark:bg-gray-700 dark:divide-gray-600">
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
              className="md:block font-medium text-gray-900 dark:text-gray-100 bg-yellow-600 p-2 rounded hover:scale-110 transition-all"
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
