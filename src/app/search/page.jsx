'use client'

import { BsFillArrowRightCircleFill } from 'react-icons/bs'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { BiArrowToLeft, BiArrowToRight } from 'react-icons/bi'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Loading from '@/components/Loading'
import WentWrong from '@/components/WentWrong'

const Search = () => {

  const [currentPageNo, setCurrentPageNo] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState({ message: '', status: '' })
  const [searchString, setSearchString] = useState('')
  const [data, setData] = useState(null)

  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [searchData, setSearchData] = useState(null)

  const increment = 1
  const highIncrement = 5
  const decrement = 1
  const highDecrement = 5

  useEffect(() => {
    fetchData()
  }, [currentPageNo])

  const fetchData = async () => {
    if (searchString === '')
      return

    try {
      setIsLoading(true)
      const response = await fetch(
        `/api/products/getsearchinfo`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ currentPageNo: currentPageNo, searchString }),
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

  const handleSubmit = () => {
    setCurrentPageNo(1)
    setSearchData(null)
    fetchData()
  }

  useEffect(() => {
    setData(null)
    fetchDescription()
  }, [searchString])

  const fetchDescription = async () => {
    if (searchString === '')
      return

    try {
      setIsSearchLoading(true)
      const response = await fetch(
        `/api/products/getsearchdescription`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ searchString }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setSearchData({ message: 'Something went wrong' })
      else if (result.products?.list?.length === 0) setSearchData({ message: 'No products found' })
      else {
        setSearchData(result.products)
      }
      setIsSearchLoading(false)
    } catch (err) {
      console.log(err)
      setSearchData({ message: '' })
    }
  }

  return (
    <>
      <div className="flex justify-center items-center my-4">
        <div className="container mx-auto bg-gray-200 dark:bg-gray-900 rounded-lg p-4 shadow-lg">
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit(e)
          }}>
            <h1 className="text-center font-bold mb-4 text-gray-700 dark:text-background-100 text-2xl">What&apos;s in your mind ?... </h1>

            <div className="flex items-center bg-white rounded-lg overflow-hidden px-3 py-2 justify-between w-full md:w-3/4 mx-auto">
              <input
                className="text-xl text-black bg-white outline-none w-3/4"
                type="text"
                placeholder="Search ..."
                value={searchString}
                onChange={(e) => {
                  setSearchString(e.target.value)
                }}
              />
              <div className="rounded-lg">
                <button className="bg-primary-800 text-gray-200 text-base rounded-lg px-4 py-2 font-thin">
                  <BsFillArrowRightCircleFill />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSearchLoading &&
        <Loading />
      }
      {searchData && !isSearchLoading &&
        <div className='flex justify-center items-center p-4'>
          <div className='bg-background-100 dark:bg-gray-900 w-full md:w-3/4 lg:w-1/2 rounded'>
            {searchData.message &&
              <div className='flex items-center justify-center min-h-[15vh]'>
                <h2 className='text-gray-900 dark:text-gray-400 uppercase md:text-2xl'>{searchData.message}</h2>
              </div>
            }
            {searchData.list &&
              <>
                <ul>
                  {searchData.list.map((product) => {
                    const { _id, title, description } = product
                    return (
                      <Link
                        key={_id}
                        href={`category/products/${_id}`}
                      >
                        <li className='p-2 border rounded'>
                          <h3 className='uppercase'>{title}</h3>
                          <p className='text-gray-900 dark:text-gray-400'>{description}</p>
                        </li>
                      </Link>

                    )
                  })}
                </ul>

                {searchData.totalCount - 4 > 0 &&
                  <>
                    <div className='border mx-auto border-gray-500 dark:border-white w-full mt-4'></div>
                    <p className='text-center my-2 text-gray-900 dark:text-gray-400'>{searchData.totalCount - 4} more products found</p>
                  </>
                }
              </>
            }
          </div>
        </div>
      }

      {!isLoading && error.message &&
        <WentWrong error={error.message} status={error.status} />
      }
      {isLoading &&
        <Loading />
      }
      {!isLoading && !error.message &&
        <>
          {data && data.list && data.list.length !== 0 &&
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
                    <li key={_id} className="w-[90vw] md:w-[80vw] mx-auto p-4 my-4 flex flex-col md:flex-row justify-center items-center md:gap-14 lg:gap-24 border-2 rounded-3xl hover:scale-105 transition-all duration-300 bg-gray-100 dark:bg-gray-800">
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
                            <Link href={`category/products/${_id}`}>
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
          {data && data.list && data.list.length === 0 &&
            <div className='bg-background-100 dark:bg-gray-900 p-2 h-[40vh] flex items-center justify-center'>
              <h1 className='text-3xl text-gray-500 uppercase text-center'>No such products found</h1>
            </div>
          }
        </>
      }
    </>
  )
}

export default Search