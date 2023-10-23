import React from 'react'

import Link from 'next/link'

import { getServerSession } from 'next-auth/next'

import { authOptions } from '../api/auth/[...nextauth]/route'
import SignInButton from '@/components/SignIn/SignInButton'

import { BsFillLockFill } from 'react-icons/bs'

const Events = async () => {
  const session = await getServerSession(authOptions)
  
  const events = [
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 1
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 2
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 3
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 4
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 5
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github",
      eventId: 6
    },
    {
      date: "October 11, 2023",
      title: "Git Github Overview",
      tags: ["Git", "Github", "Event"],
      description: "This event is all about the various uses of Git & Github ",
      eventId: 7
    },
  ]

  return (
    <>
      <div>
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-yellow-900">
            EVENTS
          </h1>
        </div>
        {session ?
          <ul>
            { events.map((event) => {
              const { date, title, tags, description, eventId } = event
              return (
                <li key={ eventId } className="flex flex-col md:flex-row py-6 justify-center border-2 m-4 rounded-3xl hover:scale-105 transition-all">
                  <div className="flex flex-col relative sm:mx-12" >
                    <h1 className="text-lg font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-xl md:text-2xl text-center">
                      {title}
                    </h1>
                    <p className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 text-center">
                      { date }
                    </p>
                    <div className='flex flex-wrap justify-center'>
                      {tags?.map((tag) => { return <span key={tag} className='mx-2 text-yellow-600'>#{tag}</span> })}
                    </div>
                    
                  </div>
                  <article className="mx-2 sm:mx-14 flex flex-col xl:space-y-0 justify-center">
                    <div className="space-y-3">
                      <div className="prose w-120 text-gray-500 dark:text-gray-400">
                        { description }
                      </div>
                      <div className='text-center'>
                        <Link href={`events/${eventId}`}>
                          <button className='text-yellow-600 p-2 bg-gray-200 rounded hover:text-gray-200 hover:bg-yellow-600 hover:scale-105 transition-all'><b>View Event</b></button>
                        </Link>
                      </div>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
          :
          <>
            <div className='h-[35vh] flex flex-col gap-6 rounded-3xl p-8 items-center bg-gradient-to-t from-gray-700 dark:to-black light:to-white'>
              <BsFillLockFill />
              <SignInButton buttonText={'Sign In to View'} />
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Events