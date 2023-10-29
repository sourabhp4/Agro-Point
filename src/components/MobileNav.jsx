'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import SignInButton from './SignIn/SignInButton'

import useAuth from '@/lib/useAuth'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const { status } = useAuth()

  useEffect(() => {
    setIsAuthenticated(status)
  }, [status])

  const links = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Categories',
      href: '/category'
    }
  ]

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  return (
    <>
      <button aria-label="Toggle Menu" onClick={onToggleNav} className="md:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="text-gray-900 dark:text-gray-100 h-8 w-8"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed md:hidden left-0 top-0 h-[100vh] w-[100vw] transform opacity-95 dark:opacity-[0.98] bg-white duration-300 ease-in-out dark:bg-gray-950
          ${navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {links.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={link.href}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {link.title}
              </Link>
            </div>
          ))}
          {isAuthenticated ?
            <>
              <div className="px-12 py-4">
                <Link
                  href='/profile'
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  onClick={onToggleNav}
                >
                  View Profile
                </Link>
              </div>
              <div className="px-12 py-4">
                <p
                  className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                  onClick={() => {
                    signOut()
                    onToggleNav()
                  }}
                >
                  Sign Out
                </p>
              </div>
            </>
            :
            <div
              className="px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
            >
              <SignInButton buttonText={'SignIn'} />
            </div>}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
