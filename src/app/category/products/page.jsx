import React from 'react'

import Link from 'next/link'
import Image from 'next/image'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '../../api/auth/[...nextauth]/route'
import SignInButton from '@/components/SignIn/SignInButton'

import { BsFillLockFill } from 'react-icons/bs'

const Blogs = async () => {
  const session = await getServerSession(authOptions)

  const blogs = [
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 1
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 2
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 3
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 4
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 5
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 6
    },
    {
      date: "October 11 2023",
      title: "Bluetooth Use in Home Automation",
      tags: ["Bluetooth", "Home Automation", "Blog"],
      description: "This blog is all about the various uses of bluetooth in Achieving Home Automation",
      image: "/images/agro_logo.png",
      blogId: 7
    },
  ]



  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-white">
            PRODUCTS TO VIEW
          </h1>
        </div>
        {session ? 
          <ul>
            { blogs.map((blog) => {
              const { date, title, tags, description, image, blogId } = blog
              return (
                <li key={ blogId } className="flex flex-col md:flex-row justify-center border-2 m-6 rounded-3xl hover:scale-105 transition-all">
                  <div className="w-48 h-48 relative mx-12" >
                    <Image
                      alt='Agro Logo'
                      src={ image }
                      fill
                      sizes="(max-width: 100px) 100vw, (max-width: 120px) 50vw, 33vw"
                      className='m-auto'
                    />
                  </div>
                  <article className="space-y-2 flex flex-col xl:space-y-0 p-2">
                    <p className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 mt-2">
                      { date }
                    </p>
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <p className="text-gray-900 dark:text-gray-100">
                            {title}
                          </p>
                        </h2>
                        <div className="flex flex-wrap">
                          {tags?.map((tag) => { return <span key={tag} className='mx-2 text-yellow-600'>#{tag}</span> })}
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        { description }
                      </div>
                      <div className='text-center'>
                        <Link href={`blogs/${blogId}`}>
                          <button className='text-yellow-600 p-2 bg-gray-200 rounded hover:text-gray-200 hover:bg-yellow-600 hover:scale-105 transition-all'><b>View Blog</b></button>
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          :
          <div className='h-[35vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-300 dark:to-black light:to-white'>
            <BsFillLockFill />
            <SignInButton buttonText={'Sign In to View'} />
          </div>
        }
      </div>
    </>
  )
}

export default Blogs