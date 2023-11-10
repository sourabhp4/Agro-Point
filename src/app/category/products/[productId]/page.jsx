'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { AiFillStar } from 'react-icons/ai'

import Loading from '@/components/Loading'
import WentWrong from '@/components/WentWrong'
import Link from 'next/link'
import UserReview from '@/components/UserReview'
import ContentLock from '@/components/ContentLock'

const ProductSpecific = (props) => {

  const productId = props.params?.productId

  const { data: session } = useSession()

  const [isLoading, setIsLoading] = useState(true)
  const [isReviewLoading, setIsReviewLoading] = useState(true)

  const [error, setError] = useState({ message: '', status: '' })
  const [data, setData] = useState(null)
  const [reviewData, setReviewData] = useState(null)

  useEffect(() => {
    fetchData()
    if (session?.user) {
      const { id } = session.user
      fetchReviews(id)
    }
  }, [session])

  const fetchData = async () => {
    try {
      const response = await fetch(
        `/api/products/getproductinfo`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ productId: productId }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setError({ message: result.error, status: result.status })
      else {
        setData(result.product)
      }
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setError({ message: '', status: '' })
    }
  }

  const fetchReviews = async (id) => {
    try {
      const response = await fetch(
        `/api/reviews/getreviews`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ userId: id, productId: productId }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setError({ message: result.error, status: result.status })
      else {
        setReviewData(result.data)
      }
      setIsReviewLoading(false)
    } catch (err) {
      console.log(err)
      setError({ message: '', status: '' })
    }
  }

  return (
    <>
      {!isLoading && !error.message &&
        <>
          {data &&
            <div className='bg-background-100 dark:bg-gray-800 mx-4 md:mx-12 rounded p-2 shadow-lg'>
              {session?.user && session.user.isAdmin &&
                <div className='flex flex-col md:flex-row justify-center items-center gap-2 md:gap-10 my-4 bg-gray-200 dark:bg-gray-700 py-4 rounded'>
                  <b>Want to modify this product?...</b>
                  <Link
                    className='py-3 px-4 rounded-xl bg-primary-800 dark:bg-primary-600 text-white hover:scale-110 transition-all'
                    href={`/updateproduct/${productId}`}
                  >
                    UPDATE
                  </Link>
                  <Link
                    className='py-3 px-4 rounded-xl bg-red-500 dark:bg-red-500 text-white hover:scale-110 transition-all'
                    href={`/updateproduct/${productId}`}
                  >
                    DELETE
                  </Link>
                </div>
              }
              <div className='flex flex-col lg:flex-row justify-center gap-2 lg:gap-14'>
                <div className='px-4 flex items-center justify-center'>
                  <Image
                    alt={data.title}
                    src={`https://drive.google.com/uc?id=${data.image}`}
                    width={100}
                    height={100}
                    className='w-64 h-64'
                  />
                </div>
                <div className='flex flex-col gap-3 w-full lg:w-3/5 p-2 md:p-4'>
                  <div>
                    <h1 className="text-3xl leading-9 uppercase tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center">
                      {data.title}
                    </h1>
                  </div>
                  <div>
                    <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgRating == 0 ? 'Not Rated' : data.avgRating + ' / 5'} <AiFillStar /> </p>
                  </div>
                  <div>
                    <p>{data.description}</p>
                  </div>
                  <div className="flex flex-wrap mt-2">
                    {data.tags?.map((tag) => { return <span key={tag} className='mx-2 text-green-700 dark:text-primary-200'>#{tag}</span> })}
                  </div>
                  <div>
                    <p className='text-primary-900 dark:text-primary-100'>Company Name: <b className='text-black dark:text-white'>{data.company}</b></p>
                  </div>
                  <div>
                    <p className='text-primary-900 dark:text-primary-100'>Category: <b className='uppercase text-black dark:text-white'>{data.category}</b></p>
                  </div>
                  <div>
                    <p className='text-primary-900 dark:text-primary-100'>Details:</p>
                    <p>{data.details}</p>
                  </div>
                  <div>
                    <a
                      href={data.officialLink}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='py-2 px-4 bg-primary-500 rounded'
                    >
                      VISIT SITE
                    </a>
                  </div>
                </div>
              </div>

              <div className='border border-gray-500 dark:border-white w-full my-4'></div>

              <div className='px-2 md:px-6'>
                <h1 className="text-xl leading-5 tracking-tight sm:text-2xl md:text-3xl md:leading-9 ">
                  Average Ratings
                </h1>
              </div>

              <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-4'>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgPerformanceRating}</p>
                  <p>Performance</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgPriceRating}</p>
                  <p>Price</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgMaintenanceRating}</p>
                  <p>Maintenance</p>
                </div>
              </div>

              <div className='text-center mt-3'>
                <p>{data.reviewCount || 0} reviews on this product till now</p>
              </div>

              <div className='border border-gray-500 dark:border-white w-full my-4'></div>

              <div className='px-2 md:px-6'>
                <h1 className="text-xl leading-5 tracking-tight sm:text-2xl md:text-3xl md:leading-9 ">
                  Reviews
                </h1>
              </div>
              {session ?
                <>
                  {!reviewData && isReviewLoading &&
                    <Loading />
                  }
                  {reviewData && !isReviewLoading &&
                    <>
                      <UserReview data={reviewData.userReview} user={session.user} productId={productId} />

                      <ul className='mt-4'>
                        {reviewData.reviews && reviewData.reviews.map((review) => {
                          const { _id, username, avgRating, performanceRating, priceRating, maintenanceRating, comment, date, isUpdated } = review
                          return (
                            <li key={_id} className='border p-2'>
                              <div className='mt-3 flex flex-col md:flex-row items-center gap-3'>
                                <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{avgRating} <AiFillStar /> </p>
                                <p>
                                  By <b>{username}</b>, On {date}{isUpdated ? ', (Edited)' : ''}
                                </p>
                              </div>
                              <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-4'>
                                <div className='flex flex-col items-center'>
                                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{performanceRating} / 5</p>
                                  <p >Performance</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{priceRating} / 5</p>
                                  <p >Price</p>
                                </div>
                                <div className='flex flex-col items-center'>
                                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{maintenanceRating} / 5</p>
                                  <p >Maintenance</p>
                                </div>
                              </div>
                              {comment &&
                                <div className='w-full md:w-3/4 mx-auto'>
                                  <h3 className='mt-4'>Comment:</h3>
                                  <div className='mt-2 p-2 w-full'>
                                    <p>{comment}</p>
                                  </div>
                                </div>
                              }
                            </li>
                          )
                        })
                        }
                      </ul>
                    </>
                  }
                </>
                :
                <>
                  <ContentLock />
                </>
              }
            </div>
          }
        </>
      }
      {session && !isLoading && error.message &&
        <WentWrong error={error.message} status={error.status} />
      }
      {isLoading &&
        <Loading />
      }
    </>
  )
}

export default ProductSpecific