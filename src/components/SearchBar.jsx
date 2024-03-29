import Link from 'next/link'
import React from 'react'

const SearchBar = () => {
  return (
    <>
      <Link href="/search" className="inline-flex items-center py-2.5 px-2 sm:px-3 ml-2 text-sm font-medium text-white bg-blue-600 rounded-lg border border-blue-400 hover:bg-blue-500 hover:text-black
             focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
        <span className='hidden sm:block'>Search</span>
      </Link>
    </>
  )
}

export default SearchBar