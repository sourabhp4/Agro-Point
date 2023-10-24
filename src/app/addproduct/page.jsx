'use client'

import NotFound from "@/components/NotFound"
import { useSession } from 'next-auth/react'
import Link from "next/link"
import { useEffect, useState } from 'react'

import { AiFillCloseCircle } from "react-icons/ai"

const AddProduct = () => {

  const { data: session } = useSession()

  const [productInfo, setProductInfo] = useState({
    title: '',
    category: '',
    description: '',
    releaseDate: '',
    image: null,
    currentTag: '',
    tags: [],
    details: '',
  })

  const [userError, setUserError] = useState('')
  const [tagError, setTagError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (productInfo.title === '' || productInfo.category === '' || productInfo.image === '' || productInfo.tagline === '' || productInfo.tags.length === 0 || productInfo.description === '') {
        setUserError('Complete all fields')
        return
      }

      window.location.reload()

    } catch (err) {
      console.log(err)
      setUserError('Something went wrong... Try again')
    }
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file)
      setProductInfo({ ...productInfo, image: file })
    else
      setProductInfo({ ...productInfo, image: null })
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
      setProductInfo({ ...productInfo, tag: tags, currentTag: '' })
    } else setTagError('Tag already present')
  }


  //Make this only to admins
  return (
    <>
      {session ?
        <div className='flex flex-col items-center'>
          <div className="space-y-2 pb-8 pt-6">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-yellow-900 text-center">
              Add the PRODUCT here...
            </h1>
          </div>
          <div className="flex flex-col w-[90vw] items-center bg-gradient-to-t from-primary-200 to-gray-200 dark:to-gray-700 rounded-xl shadow-md">

            <div className="w-full px-4 md:px-12">
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Product Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="block w-full md:w-3/4 px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, title: target.value })
                      setUserError('')
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Category
                  </label>
                  <select 
                    id="category" 
                    className="w-full md:w-1/2 bg-gray-50 border border-gray-300 text-gray-900 rounded focus:ring-blue-500 focus:border-blue-500 block p-1"
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, category: target.value })
                      setUserError('')
                      console.log({ ...productInfo, category: target.value })
                    }}
                  >
                    <option defaultValue value="">Choose a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Description (Short and Sweet)
                  </label>
                  <input
                    id="description"
                    type="text"
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, description: target.value })
                      setUserError('')
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="releaseDate"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Release Date
                  </label>
                  <input
                    id="releaseDate"
                    type="date"
                    className="block w-full sm:w-fit px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, releaseDate: target.value })
                      setUserError('')
                    }}
                  />
                </div>

                <div className="mb-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div>
                    <label
                      htmlFor="image"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Image
                    </label>
                    <input
                      id="image"
                      type="file"
                      accept="image/*"
                      className="block w-full sm:w-fit px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      autoComplete='true'
                      onChange={handleImageChange}
                    />
                  </div>
                  <img
                    src={productInfo.image ? URL.createObjectURL(productInfo.image) : ''}
                    alt='Choose image'
                    className='w-40 h-40 mb-4'
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="tags"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Tags
                  </label>
                  <div className="flex gap-2 bg-white w-full relative min-h-max border border-yellow-300 rounded p-2 overflow-auto">
                    {productInfo.tags.map((tag, index) => {
                      return (
                        <div key={index} className="flex items-center gap-1 text-xl text-black bg-primary-200 p-1 rounded-xl">
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
                        setUserError('')
                        setTagError('')
                      }}
                    />
                    <label
                      className="w-fit py-2 px-4 bg-gray-500 text-white rounded hover:scale-105"
                      onClick={addTag}
                      htmlFor="tags"
                    >
                      ADD
                    </label>
                  </div>
                </div>

                {tagError &&
                  <div>
                    <p className='bg-red-500 text-white text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{tagError}</p>
                  </div>
                }

                <div className="mb-4">
                  <label
                    htmlFor="details"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Product Details
                  </label>
                  <textarea
                    rows={10}
                    id="details"
                    className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    autoComplete='true'
                    onChange={({ target }) => {
                      setProductInfo({ ...productInfo, details: target.value })
                      setUserError('')
                    }}
                  />
                </div>

                {userError &&
                  <div>
                    <p className='bg-red-500 text-white text-xs w-fit mx-auto p-2 rounded-2xl transition-all'>{userError}</p>
                  </div>
                }

                <div className="mt-2 mb-4 flex justify-center gap-2 sm:gap-10">
                  <Link
                    href='/profile'
                    className="w-fit px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-400 focus:outline-none focus:bg-yellow-600"
                  >
                    CANCEL
                  </Link>
                  <button
                    className="w-fit px-4 py-2 tracking-wide text-black transition-colors duration-200 transform bg-yellow-600 rounded-md hover:bg-yellow-400 focus:outline-none focus:bg-yellow-600"
                  >
                    SUBMIT
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
        :
        <NotFound />
      }
    </>
  )
}

export default AddProduct