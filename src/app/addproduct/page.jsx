'use client'

import Loading from "@/components/Loading"
import NotFound from "@/components/NotFound"
import { useSession } from "next-auth/react"

import Link from "next/link"
import { useEffect, useState } from 'react'

import { AiFillCloseCircle } from "react-icons/ai"

const AddProduct = () => {
  const [userData, setUserData] = useState({ isAdmin: false })

  const { data: session, status } = useSession()

  useEffect(() => {
    if (session?.user) {
      const { id, isAdmin } = session.user
      setUserData({ isAdmin: isAdmin, id: id })
    }
  }, [session])

  const [productInfo, setProductInfo] = useState({
    title: '',
    category: '',
    description: '',
    company: '',
    image: '',
    currentTag: '',
    tags: [],
    details: '',
  })

  const [userError, setUserError] = useState({ message: '', isError: true })
  const [tagError, setTagError] = useState('')
  const [isImageError, setIsImageError] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (productInfo.title === '' || productInfo.category === '' || productInfo.description === '' || productInfo.company === '' || productInfo.image === '' || productInfo.details === '') {
        setUserError({ message: 'Complete all fields', isError: true })
        return
      }
      if (isImageError) {
        setUserError({ message: 'Enter valid Image ID', isError: true })
        return
      }
      if (productInfo.tags.length === 0) {
        setUserError({ message: 'Enter atleast one tag', isError: true })
        return
      }

      setUserError({ message: 'Your Request is being processed', isError: false })

      const response = await fetch(
        `/api/products/addproduct`,
        {
          method: "POST",
          headers: {
            Accept: "Application/json",
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({ ...productInfo, userId: userData.id }),
        }
      )
      const data = await response.json()

      if (data.status !== 200) setUserError({ message: data.error, isError: true })
      else {
        setUserError({ message: 'Product Added Successfully', isError: false })
        setProductInfo({
          title: '',
          category: '',
          description: '',
          company: '',
          image: '',
          currentTag: '',
          tags: [],
          details: '',
        })
      }
    } catch (err) {
      console.log(err)
      setUserError({ message: 'Something went wrong... Try again', isError: true })
    }
  }

  const removeTag = (tagToRemove) => {
    setProductInfo((productInfo) => ({
      ...productInfo,
      tags: productInfo.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const addTag = () => {
    if (!productInfo.currentTag)
      return
    else if (!productInfo.tags.includes(productInfo.currentTag)) {
      const tags = productInfo.tags
      tags.push(productInfo.currentTag)
      setProductInfo({ ...productInfo, tags: tags, currentTag: '' })
    } else setTagError('Tag already present')
  }

  return (
    <>
      {session && userData.isAdmin &&
        <div className='flex flex-col items-center'>
          <div className="space-y-2 pb-8 pt-6">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-white dark:text-gray-900 text-center">
              Add the PRODUCT here...
            </h1>
          </div>
          <div className="flex flex-col w-[90vw] items-center bg-background-100 dark:bg-gray-800 rounded-xl shadow-md">
            <div className="w-full px-4 md:px-12">
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Product Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={productInfo.title}
                    className="block w-full md:w-3/4 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, title: target.value })
                      setUserError({ message: '', isError: true })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    value={productInfo.category}
                    className="w-full md:w-1/2 p-2 bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500"
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, category: target.value })
                      setUserError({ message: '', isError: true })
                    }}
                  >
                    <option defaultValue value="">Choose a Category</option>
                    <option value="fertilizers">FERTILIZERS</option>
                    <option value="pesticides">PESTICIDES</option>
                    <option value="tools">TOOLS</option>
                    <option value="seeds">SEEDS</option>
                    <option value="vehicles">VEHICLES</option>
                    <option value="other">OTHER</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Description (Short and Sweet)
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={productInfo.description}
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, description: target.value })
                      setUserError({ message: '', isError: true })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="company"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Company Name
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={productInfo.company}
                    className="block w-full md:w-3/4 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, company: target.value })
                      setUserError({ message: '', isError: true })
                    }}
                  />
                </div>

                <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                    >
                      Image ID from G-DRIVE
                    </label>
                    <input
                      id="image"
                      type="text"
                      value={productInfo.image}
                      className="block w-full sm:w-fit px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      autoComplete='true'
                      onChange={({ target }) => {
                        setProductInfo({ ...productInfo, image: target.value })
                        setUserError({ message: '', isError: true })
                        setIsImageError('')
                      }}
                    />
                  </div>
                  {productInfo.image && !isImageError &&
                    <img
                      src={`https://drive.google.com/uc?id=${productInfo.image}`}
                      alt='Choose image'
                      className='w-40 h-40 mb-4'
                      onError={() => setIsImageError(true)}
                    />
                  }
                  {productInfo.image && isImageError &&
                    <div className="w-40 h-40 mb-4 bg-white flex items-center justify-center"><b className="text-red-600">Image Not Found</b></div>
                  }
                  {!productInfo.image &&
                    <div className="w-40 h-40 mb-4 text-black bg-white flex items-center justify-center"><b>Image Preview</b></div>
                  }
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Tags
                  </label>
                  <div className="flex gap-2 bg-white w-full relative min-h-max border border-yellow-300 rounded p-2 overflow-auto">
                    {productInfo.tags.map((tag, index) => {
                      return (
                        <div key={index} className="flex items-center gap-1 text-xl text-black bg-white border-2 p-1 rounded-xl">
                          #{tag}
                          <AiFillCloseCircle
                            onClick={() => removeTag(tag)}
                          />
                        </div>
                      )
                    })
                    }
                  </div>
                  <div className="flex w-full md:w-1/2 gap-4 justify-between px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40">
                    <input
                      id="tags"
                      type="text"
                      className="focus:outline-none w-3/4 bg-white"
                      autoComplete='true'
                      value={productInfo.currentTag}
                      onChange={({ target }) => {
                        setProductInfo({ ...productInfo, currentTag: target.value })
                        setUserError({ message: '', isError: true })
                        setTagError('')
                      }}
                    />
                    <label
                      className="w-fit py-2 px-4 bg-primary-800 text-white rounded hover:scale-105"
                      onClick={addTag}
                      htmlFor="tags"
                    >
                      ADD
                    </label>
                  </div>
                </div>

                {tagError &&
                  <div>
                    <p className='text-red-500 w-fit mx-auto p-2 rounded-2xl transition-all'>{tagError}</p>
                  </div>
                }

                <div className="mb-4">
                  <label
                    htmlFor="details"
                    className="block text-sm font-semibold text-gray-800 dark:text-gray-200"
                  >
                    Product Details
                  </label>
                  <textarea
                    rows={10}
                    id="details"
                    value={productInfo.details}
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, details: target.value })
                      setUserError({ message: '', isError: true })
                    }}
                  />
                </div>

                {userError.message &&
                  <div>
                    <p className={(userError.isError ? 'text-red-500' : 'text-green-600') + ' w-fit mx-auto p-2 rounded-2xl transition-all'}>{userError.message}</p>
                  </div>
                }

                <div className="mt-2 mb-4 flex justify-center gap-2 sm:gap-10">
                  <Link
                    href='/profile'
                    className="w-fit px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-yellow-600 rounded-md hover:bg-yellow-400 focus:outline-none focus:bg-yellow-600"
                  >
                    CANCEL
                  </Link>
                  <button
                    className="w-fit px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-primary-600 rounded-md hover:bg-primary-900 focus:outline-none focus:bg-primary-900"
                  >
                    SUBMIT
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      }
      {!session && status === 'loading' && <Loading />}
      {(!session && status === 'unauthenticated') || (session && !userData.isAdmin) &&
        <NotFound />
      }
    </>
  )
}

export default AddProduct