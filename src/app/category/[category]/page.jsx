'use client'

import { useSession } from 'next-auth/react'

import { BsFillLockFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'

import SignInButton from '@/components/SignIn/SignInButton'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const CategorySpecific = (props) => {
  const category = props.params?.category

  const { data: session } = useSession()
  const [currentPageNo, setCurrentPageNo] = useState(1)

  const increment = 1
  const highIncrement = 5
  const decrement = 1
  const highDecrement = 5

  const products = {
    totalPages: 12,
    list: [
      {
        id: '1',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '2',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '3',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '4',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '5',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '6',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
      {
        id: '7',
        title: 'Test',
        img: '/images/agro.png',
        releaseDate: '2021 3 4',
        tags: ['hello', 'world', 'where', 'going in the room', 'be'],
        description: 'hello everyone welcome to my youtube channel',
      },
    ]
  }

  const [data, setData] = useState(products)

  const incrementPageNo = (increment) => {
    if (currentPageNo === data.totalPages)
      return
    if (currentPageNo + increment >= data.totalPages)
      setCurrentPageNo(data.totalPages)
    else
      setCurrentPageNo(currentPageNo + increment)
  }

  const decrementPageNo = (decrement) => {
    if (currentPageNo === 1)
      return
    if (currentPageNo - decrement <= 1)
      setCurrentPageNo(1)
    else
      setCurrentPageNo(currentPageNo - decrement)
  }

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 uppercase tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-yellow-900">
            {category}
          </h1>
        </div>
        {session ?
          <>
            <div className='flex justify-center items-center gap-4 text-lg sm:text-xl md:text-2xl text-bold bg-green-400 w-fit mx-auto py-2 px-2 sm:px-6 rounded-xl'>
              <BiArrowToLeft
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => decrementPageNo(highDecrement)}
              />
              <AiOutlineArrowLeft
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => decrementPageNo(decrement)}
              />
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 text-black'>
                <span>Page:</span>
                <span>{currentPageNo} / {data.totalPages}</span>
              </div>
              <AiOutlineArrowRight
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => incrementPageNo(increment)}
              />
              <BiArrowToRight
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => incrementPageNo(highIncrement)}
              />
            </div>

            <ul className='mx-2 mt-8'>
              {data && data.list && data.list.length === 0 ?
                <div className='bg-white dark:bg-gray-700 w-fit mx-auto mb-6 rounded p-2'>
                  <h1 className="text-xl tracking-tight sm:text-2xl md:text-3xl text-center text-primary-900">
                    No Products Available at this time...
                  </h1>
                </div>
                :
                data.list.map((product) => {
                const { id, title, img, releaseDate, tags, description } = product
                return (
                  <li key={id} className="w-[90vw] md:w-[80vw] mx-auto my-4 flex flex-col md:flex-row justify-center items-center md:gap-24 lg:gap-48 border-2 rounded-3xl hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-800">
                    <Image
                      alt={title}
                      src={img}
                      width={100}
                      height={100}
                      className='w-48 h-48'
                    />
                    <article className="space-y-2 flex flex-col xl:space-y-0 px-2 pb-4">
                      <p className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 mt-2">
                        {releaseDate}
                      </p>
                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <p className="text-gray-900 dark:text-gray-100">
                              {title}
                            </p>
                          </h2>
                          <div className="flex flex-wrap mt-2">
                            {tags?.map((tag) => { return <span key={tag} className='mx-2 text-green-700 dark:text-primary-200'>#{tag}</span> })}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {description}
                        </div>
                        <div className='text-center'>
                          <Link href={`products/${id}`}>
                            <button className='text-green-700 p-2 bg-gray-300 rounded hover:text-gray-300 hover:bg-green-700 hover:scale-105 transition-all'><b>View Product</b></button>
                          </Link>
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>

            <div className='flex justify-center items-center gap-4 text-lg sm:text-xl md:text-2xl text-bold bg-green-400 w-fit mx-auto py-2 px-2 sm:px-6 rounded-xl'>
              <BiArrowToLeft
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => decrementPageNo(highDecrement)}
              />
              <AiOutlineArrowLeft
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => decrementPageNo(decrement)}
              />
              <div className='flex flex-col sm:flex-row gap-2 sm:gap-4 text-black'>
                <span>Page:</span>
                <span>{currentPageNo} / {data.totalPages}</span>
              </div>
              <AiOutlineArrowRight
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => incrementPageNo(increment)}
              />
              <BiArrowToRight
                className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                onClick={() => incrementPageNo(highIncrement)}
              />
            </div>
          </>
          :
          <div className='h-[35vh] w-full mx-2 flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-300 dark:to-black light:to-white'>
            <BsFillLockFill />
            <SignInButton buttonText={'Sign In to View'} />
          </div>
        }
      </div>
    </>
  )
}

export default CategorySpecific