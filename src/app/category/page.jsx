import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { AiOutlineDoubleRight } from 'react-icons/ai'

const Category = async () => {

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
      title: 'Others',
      href: 'category/others',
      img: '/images/others.png',
    },
  ]

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
            CATEGORIES
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 m-4">
          {categories.map((category) => {
            return (
              <div key={category.title} className="font-medium text-gray-900 dark:text-gray-100 p-3 rounded-3xl bg-background-100 dark:bg-gray-900 shadow-lg">
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
                  className='flex items-center gap-2 bg-primary-800 text-white hover:bg-primary-400 hover:text-black border-2 dark:border-gray-900 dark:hover:bg-background-100 dark:bg-black dark:text-green-600 w-fit mx-auto my-3 p-2 rounded-xl hover:scale-110'
                >
                  VIEW <AiOutlineDoubleRight />
                </Link>
              </div>)
          })}
        </div>
      </div>
    </>
  )
}

export default Category