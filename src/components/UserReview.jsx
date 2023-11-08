
import { useState, useEffect } from 'react'

import { AiFillStar, AiOutlineEdit } from 'react-icons/ai'

const UserReview = ({ data, user }) => {

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [newReview, setNewReview] = useState(null)

  useEffect(() => {
    if (newReview) {
      //call add review here
    }
  }, [newReview])

  return (
    <>
      {data ?
        <div className='px-2 md:px-6 mt-4 bg-white dark:bg-gray-700 rounded'>
          <div className='flex flex-row justify-between items-center'>
            <h2 className='text-xl uppercase'>Your Review</h2>
            <p
              className='mx-4 mt-2 text-xl flex flex-row items-center gap-4 bg-white text-gray-800 px-3 py-2 rounded hover:scale-105 transition-all'
            >
              Edit <AiOutlineEdit className='text-2xl' />
            </p>
          </div>
          <div className='mt-3 flex md:flex-row items-center gap-3'>
            <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgRating} <AiFillStar /> </p>
            <p>
              By <b>{data.username}</b>, On {data.date}{data.isModified ? ', (Edited)' : ''}
            </p>
          </div>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-4'>
            <div className='flex flex-col items-center'>
              <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.performanceRating} / 5</p>
              <p >Performance</p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.priceRating} / 5</p>
              <p >Price</p>
            </div>
            <div className='flex flex-col items-center'>
              <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.maintenanceRating} / 5</p>
              <p >Maintenance</p>
            </div>
          </div>
          {data.comment &&
            <div className='w-full md:w-3/4 mx-auto'>
              <h3 className='mt-4'>Comment:</h3>
              <div className='mt-2 p-2 w-full'>
                <p>{data.comment}</p>
              </div>
            </div>
          }
        </div>
        :
        <>
          {user.isAdmin ? <></> :
            <div className='px-2 md:px-6 mt-4 text-xl flex flex-col justify-center items-center gap-3'>
              <p>Give this product a review...😁</p>
              {isReviewOpen ?
                <div>

                  <p
                    onClick={() => setIsReviewOpen(false)}
                    className='px-3 py-2 bg-primary-600 rounded w-fit'
                  >
                    CANCEL</p>
                </div>
                :
                <p
                  onClick={() => setIsReviewOpen(true)}
                  className='px-3 py-2 bg-primary-600 rounded w-fit'
                >
                  ADD a Review</p>
              }
            </div>
          }
        </>

      }
    </>
  )
}

export default UserReview