'use client'

import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Loading from '@/components/Loading'
import WentWrong from '@/components/WentWrong'

const CategorySpecific = (props) => {
  const category = props.params?.category

  const [currentPageNo, setCurrentPageNo] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState({ message: '', status: '' })

  const increment = 1
  const highIncrement = 5
  const decrement = 1
  const highDecrement = 5

  const [data, setData] = useState(null)

  useEffect(() => {
    fetchData()
  }, [currentPageNo])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/products/getproductlist`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ category: category || '', currentPageNo: currentPageNo }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setError({ message: result.error, status: result.status })
      else {
        setData(result.products)
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setError({ message: '', status: '' })
    }
  }

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
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 uppercase tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
          {category}
        </h1>
      </div>

      {!isLoading && !error.message &&
        <>
          {data && data.list && data.list.length === 0 ?
            <div className='bg-white dark:bg-gray-900 dark:text-primary-200 w-fit mx-auto mb-6 rounded-xl p-4'>
              <h1 className="text-xl tracking-tight sm:text-2xl md:text-3xl text-center">
                No Products Available at this time...
              </h1>
            </div>
            :
            <>
              <div className='flex justify-center text-white items-center gap-4 text-lg sm:text-xl md:text-2xl text-bold bg-primary-800 w-fit mx-auto py-2 px-2 sm:px-6 rounded-xl'>
                <BiArrowToLeft
                  className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                  onClick={() => decrementPageNo(highDecrement)}
                />
                <AiOutlineArrowLeft
                  className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                  onClick={() => decrementPageNo(decrement)}
                />
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
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

                {data.list.map((product) => {
                  const { _id, title, image, tags, description } = product
                  return (
                    <li key={_id} className="w-[90vw] md:w-[80vw] mx-auto p-4 my-4 flex flex-col md:flex-row justify-center items-center md:gap-14 lg:gap-24 border-2 rounded-3xl hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-800  shadow-lg">
                      <Image
                        alt={title}
                        src={`https://drive.google.com/uc?id=${image}`}
                        width={100}
                        height={100}
                        className='w-48 h-48'
                      />
                      <article className="space-y-2 flex flex-col xl:space-y-0 px-2 pb-4 w-full md:w-1/2">
                        <div className="space-y-3">
                          <div>
                            <h2 className="text-2xl font-bold leading-8 tracking-tight mt-2">
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
                            <Link href={`products/${_id}`}>
                              <button className='text-green-700 p-2 bg-gray-300 rounded hover:text-gray-300 hover:bg-green-700 hover:scale-105 transition-all'><b>View Product</b></button>
                            </Link>
                          </div>
                        </div>
                      </article>
                    </li>
                  )
                })}
              </ul>

              <div className='flex justify-center text-white items-center gap-4 text-lg sm:text-xl md:text-2xl text-bold bg-primary-800 w-fit mx-auto py-2 px-2 sm:px-6 rounded-xl'>
                <BiArrowToLeft
                  className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                  onClick={() => decrementPageNo(highDecrement)}
                />
                <AiOutlineArrowLeft
                  className='bg-white text-black dark:bg-black dark:text-white hover:scale-150 scale-125 rounded transition-all duration-300'
                  onClick={() => decrementPageNo(decrement)}
                />
                <div className='flex flex-col sm:flex-row gap-2 sm:gap-4'>
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
          }

        </>
      }
      {!isLoading && error.message &&
        <WentWrong error={error.message} status={error.status} />
      }
      {isLoading &&
        <Loading />
      }
    </>
  )
}

export default CategorySpecific