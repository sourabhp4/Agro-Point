
import { useState } from 'react'

import { AiFillStar, AiOutlineEdit } from 'react-icons/ai'
import { BsStarFill, BsStar } from 'react-icons/bs'

const UserReview = ({ data, user, productId }) => {

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [newReview, setNewReview] = useState({
    performanceRating: 0,
    priceRating: 0,
    maintenanceRating: 0,
    comment: null,
  })

  const [isEditOpen, setIsEditOpen] = useState(false)
  const [updatedReview, setUpdatedReview] = useState(data)

  const [commentMessage, setCommentMessage] = useState(null)

  const setRating = (type, value) => {

    if (type !== 'performanceRating' && type !== 'priceRating' && type !== 'maintenanceRating')
      return

    if (value <= 0 || value > 5)
      return

    setCommentMessage(null)

    setNewReview({ ...newReview, [type]: value })
  }

  const addReview = async () => {
    if (newReview.performanceRating === 0 || newReview.priceRating === 0 || newReview.maintenanceRating === 0) {
      setCommentMessage('Fields marked with * are required')
      return
    }

    setCommentMessage('Processing your request... Please wait...:)')

    try {
      const response = await fetch(
        `/api/reviews/addreview`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ userId: user.id, productId: productId, ...newReview }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setCommentMessage(result.error)
      else {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      setCommentMessage(null)
    }
  }

  const setUpdateRating = (type, value) => {

    if (type !== 'performanceRating' && type !== 'priceRating' && type !== 'maintenanceRating')
      return

    if (value <= 0 || value > 5)
      return

    setCommentMessage(null)

    setUpdatedReview({ ...updatedReview, [type]: value })
  }

  const updateReview = async () => {
    if (updatedReview.performanceRating === 0 || updatedReview.priceRating === 0 || updatedReview.maintenanceRating === 0) {
      setCommentMessage('Fields marked with * are required')
      return
    }
    if (updatedReview.comment === data.comment && updatedReview.performanceRating === data.performanceRating && updatedReview.priceRating === data.priceRating && updatedReview.maintenanceRating === data.maintenanceRating) {
      setCommentMessage('No changes found to update')
      return
    }

    setCommentMessage('Processing your request... Please wait...:)')
    
    try {
      const response = await fetch(
        `/api/reviews/updatereview`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ userId: user.id, productId: productId, ...updatedReview }),
        }
      )
      const result = await response.json()

      if (result.status !== 200) setCommentMessage(result.error)
      else {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
      setCommentMessage(null)
    }
  }

  return (
    <>
      {data ?
        <>
          {isEditOpen &&
            <div className='px-2 md:px-6 mt-4 bg-white dark:bg-gray-700 rounded'>
              <div className='flex flex-row justify-between items-center'>
                <h2 className='text-xl uppercase'>Your Review</h2>
              </div>
              <div className='mt-3 flex md:flex-row items-center gap-3'>
                <p>
                  By <b>{data.username}</b>
                </p>
              </div>

              <div className='flex flex-col gap-4 justify-center items-center w-full md:w-3/4 mx-auto mt-4'>
                <div className='flex flex-col md:flex-row gap-4 md:gap-12 text-2xl'>
                  <div className='flex flex-col gap-2 items-center '>
                    <div className='flex gap-2'>
                      <div onClick={() => setUpdateRating('performanceRating', 1)}>{updatedReview.performanceRating >= 1 ? <BsStarFill /> : <BsStar />}</div>
                      <div onClick={() => setUpdateRating('performanceRating', 2)}>{updatedReview.performanceRating >= 2 ? <BsStarFill /> : <BsStar />}</div>
                      <div onClick={() => setUpdateRating('performanceRating', 3)}>{updatedReview.performanceRating >= 3 ? <BsStarFill /> : <BsStar />}</div>
                      <div onClick={() => setUpdateRating('performanceRating', 4)}>{updatedReview.performanceRating >= 4 ? <BsStarFill /> : <BsStar />}</div>
                      <div onClick={() => setUpdateRating('performanceRating', 5)}>{updatedReview.performanceRating >= 5 ? <BsStarFill /> : <BsStar />}</div>
                    </div>
                    <p className='text-primary-900 dark:text-gray-400'>Performance*</p>
                  </div>
                  <div className='flex flex-col gap-2 items-center'>
                    <div className='flex gap-2'>
                      <p onClick={() => setUpdateRating('priceRating', 1)}>{updatedReview.priceRating >= 1 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('priceRating', 2)}>{updatedReview.priceRating >= 2 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('priceRating', 3)}>{updatedReview.priceRating >= 3 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('priceRating', 4)}>{updatedReview.priceRating >= 4 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('priceRating', 5)}>{updatedReview.priceRating >= 5 ? <BsStarFill /> : <BsStar />}</p>
                    </div>
                    <p className='text-primary-900 dark:text-gray-400'>Price*</p>
                  </div>
                  <div className='flex flex-col gap-2 items-center'>
                    <div className='flex gap-2'>
                      <p onClick={() => setUpdateRating('maintenanceRating', 1)}>{updatedReview.maintenanceRating >= 1 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('maintenanceRating', 2)}>{updatedReview.maintenanceRating >= 2 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('maintenanceRating', 3)}>{updatedReview.maintenanceRating >= 3 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('maintenanceRating', 4)}>{updatedReview.maintenanceRating >= 4 ? <BsStarFill /> : <BsStar />}</p>
                      <p onClick={() => setUpdateRating('maintenanceRating', 5)}>{updatedReview.maintenanceRating >= 5 ? <BsStarFill /> : <BsStar />}</p>
                    </div>
                    <p className='text-primary-900 dark:text-gray-400'>Maintenance*</p>
                  </div>
                </div>
                {/* <p className='text-sm' >Fields marked with * are required</p> */}
                <div className='bg-white p-2 rounded w-full mt-2'>
                  <h3 className='text-primary-800'>Comment: </h3>
                  <textarea
                    rows={4}
                    onChange={(e) => {
                      setUpdatedReview({ ...updatedReview, comment: e.target.value })
                      setCommentMessage(null)
                    }}
                    value={updatedReview.comment || ''}
                    className='bg-white w-full text-gray-800 border-2 mt-2'
                  />
                </div>

                <div className='text-red-900 dark:text-gray-200 text-sm'>
                  <p>{commentMessage}</p>
                </div>

                <div className='flex gap-2'>
                  <button
                    onClick={() => {
                      setIsEditOpen(false)
                      setCommentMessage(null)
                    }}
                    className='px-3 py-2 bg-yellow-600 rounded w-fit hover:scale-105 transition-all'
                  >
                    CANCEL</button>
                  <button
                    onClick={updateReview}
                    className='px-3 py-2 bg-primary-600 rounded w-fit hover:scale-105 transition-all'
                  >
                    SUBMIT</button>
                </div>
              </div>

            </div>
          }
          {!isEditOpen &&
            <div className='px-2 md:px-6 mt-4 bg-white dark:bg-gray-700 rounded'>
              <div className='flex flex-row justify-between items-center'>
                <h2 className='text-xl uppercase'>Your Review</h2>
                <button
                  className='mx-4 mt-2 text-xl flex flex-row items-center gap-4 bg-gray-200 text-gray-800 px-3 py-2 rounded hover:scale-105 transition-all'
                  onClick={() => setIsEditOpen(true)}
                >
                  <span className='hidden sm:block'>Edit</span> <AiOutlineEdit className='text-2xl' />
                </button>
              </div>
              <div className='mt-3 flex flex-col md:flex-row items-center gap-3'>
                <p className='bg-primary-800 dark:bg-primary-600 w-fit py-1 px-2 text-white flex flex-row items-center gap-2 rounded-xl'>{data.avgRating} <AiFillStar /> </p>
                <p>
                  By <b>{data.username}</b>, On {data.date}{data.isUpdated ? ', (Edited)' : ''}
                </p>
              </div>
              <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-4'>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.performanceRating} / 5</p>
                  <p >Performance</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.priceRating} / 5</p>
                  <p >Price</p>
                </div>
                <div className='flex flex-col items-center'>
                  <p className='bg-primary-800 dark:bg-primary-600 text-white w-fit py-1 px-2 flex flex-row items-center gap-2 rounded-xl'>{data.maintenanceRating} / 5</p>
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
          }
          
          <div className='border mx-auto border-gray-500 dark:border-white w-3/4 my-4'></div>
        </>
        :
        <>
          {user.isAdmin ? <></> :
            <div className='px-2 md:px-6 mt-4 text-xl flex flex-col justify-center items-center gap-3'>
              <p>Give this product a review...😁</p>
              {isReviewOpen ?
                <div className='flex flex-col gap-4 justify-center items-center w-full md:w-3/4'>
                  <div className='flex flex-col md:flex-row gap-4 md:gap-12 text-2xl'>
                    <div className='flex flex-col gap-2 items-center '>
                      <div className='flex gap-2'>
                        <div onClick={() => setRating('performanceRating', 1)}>{newReview.performanceRating >= 1 ? <BsStarFill /> : <BsStar />}</div>
                        <div onClick={() => setRating('performanceRating', 2)}>{newReview.performanceRating >= 2 ? <BsStarFill /> : <BsStar />}</div>
                        <div onClick={() => setRating('performanceRating', 3)}>{newReview.performanceRating >= 3 ? <BsStarFill /> : <BsStar />}</div>
                        <div onClick={() => setRating('performanceRating', 4)}>{newReview.performanceRating >= 4 ? <BsStarFill /> : <BsStar />}</div>
                        <div onClick={() => setRating('performanceRating', 5)}>{newReview.performanceRating >= 5 ? <BsStarFill /> : <BsStar />}</div>
                      </div>
                      <p className='text-primary-900 dark:text-gray-400'>Performance*</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                      <div className='flex gap-2'>
                        <p onClick={() => setRating('priceRating', 1)}>{newReview.priceRating >= 1 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('priceRating', 2)}>{newReview.priceRating >= 2 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('priceRating', 3)}>{newReview.priceRating >= 3 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('priceRating', 4)}>{newReview.priceRating >= 4 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('priceRating', 5)}>{newReview.priceRating >= 5 ? <BsStarFill /> : <BsStar />}</p>
                      </div>
                      <p className='text-primary-900 dark:text-gray-400'>Price*</p>
                    </div>
                    <div className='flex flex-col gap-2 items-center'>
                      <div className='flex gap-2'>
                        <p onClick={() => setRating('maintenanceRating', 1)}>{newReview.maintenanceRating >= 1 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('maintenanceRating', 2)}>{newReview.maintenanceRating >= 2 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('maintenanceRating', 3)}>{newReview.maintenanceRating >= 3 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('maintenanceRating', 4)}>{newReview.maintenanceRating >= 4 ? <BsStarFill /> : <BsStar />}</p>
                        <p onClick={() => setRating('maintenanceRating', 5)}>{newReview.maintenanceRating >= 5 ? <BsStarFill /> : <BsStar />}</p>
                      </div>
                      <p className='text-primary-900 dark:text-gray-400'>Maintenance*</p>
                    </div>
                  </div>
                  {/* <p className='text-sm' >Fields marked with * are required</p> */}
                  <div className='bg-white p-2 rounded w-full mt-2'>
                    <h3 className='text-primary-800'>Comment: </h3>
                    <textarea
                      rows={4}
                      onChange={(e) => {
                        setNewReview({ ...newReview, comment: e.target.value })
                        setCommentMessage(null)
                      }}
                      value={newReview.comment || ''}
                      className='bg-white w-full text-gray-800 border-2 mt-2'
                    />
                  </div>

                  <div className='text-red-900 dark:text-gray-200 text-sm'>
                    <p>{commentMessage}</p>
                  </div>

                  <div className='flex gap-2'>
                    <button
                      onClick={() => {
                        setIsReviewOpen(false)
                        setCommentMessage(null)
                        setNewReview({
                          performanceRating: 0,
                          priceRating: 0,
                          maintenanceRating: 0,
                          comment: null,
                        })
                      }}
                      className='px-3 py-2 bg-yellow-600 rounded w-fit hover:scale-105 transition-all'
                    >
                      CANCEL</button>
                    <button
                      onClick={addReview}
                      className='px-3 py-2 bg-primary-600 rounded w-fit hover:scale-105 transition-all'
                    >
                      SUBMIT</button>
                  </div>
                </div>
                :
                <p
                  onClick={() => setIsReviewOpen(true)}
                  className='px-3 py-2 bg-primary-600 rounded w-fit hover:scale-105 transition-all'
                >
                  ADD a Review</p>
              }
              
            <div className='border mx-auto border-gray-500 dark:border-white w-3/4 my-4'></div>
            </div>
          }
        </>
      }
    </>
  )
}

export default UserReview