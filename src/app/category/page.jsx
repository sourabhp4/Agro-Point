import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '../api/auth/[...nextauth]/route'
import SignInButton from '@/components/SignIn/SignInButton'

import { BsFillLockFill } from 'react-icons/bs'
import { AiOutlineDoubleRight } from 'react-icons/ai'

const Category = async () => {
  const session = await getServerSession(authOptions)

  const categories = [
    {
      title: 'Fertilizers',
      href: 'category/fertilizers',
      img: '/images/fertilizers.png',
    },
    {
      title: 'Pesticides',
      href: 'category/pesticides',
      img: '/images/pesticides.png',
    },
    {
      title: 'Tools',
      href: 'category/tools',
      img: '/images/tools.png',
    },
    {
      title: 'Seeds',
      href: 'category/seeds',
      img: '/images/seeds.png',
    },
    {
      title: 'Vehicles',
      href: 'category/vehicles',
      img: '/images/vehicles.png',
    },
    {
      title: 'Other',
      href: 'category/other',
      img: '/images/others.png',
    },
  ]

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-yellow-900">
            CATEGORIES
          </h1>
        </div>
        {session ?
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
            {categories.map((category) => {
              return (
                <div className="font-medium text-gray-900 dark:text-gray-100 p-2 rounded bg-gradient-to-r from-yellow-400 to-green-600">
                  <h2 className='text-center text-xl mb-2 uppercase bg-white dark:bg-black rounded-2xl w-fit mx-auto p-2 dark:text-green-600'>{category.title}</h2>
                  <Image
                    alt={category.title}
                    src={category.img}
                    width={100}
                    height={100}
                    className='w-44 h-44 mx-auto'
                  />
                  <Link
                    key={category.title}
                    href={category.href}
                    className='flex items-center gap-2 bg-primary-200 text-black dark:bg-black dark:text-green-600 w-fit mx-auto my-3 p-2 rounded-xl hover:scale-110'
                  >
                    VIEW <AiOutlineDoubleRight />
                  </Link>
                </div>)
            })}
          </div>
          :
          <div className='h-[35vh] mx-4 flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-300 dark:to-black light:to-white'>
            <BsFillLockFill />
            <SignInButton buttonText={'Sign In to View'} />
          </div>
        }
      </div>
    </>
  )
}

export default Category