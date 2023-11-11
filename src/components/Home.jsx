import Image from "next/image"
import Link from "next/link"

import { BsFillArrowRightCircleFill } from 'react-icons/bs'

export default function Home() {
  return (
    <>
      <div>
        <section className="w-full h-[100vh] bg-[url('/images/bg8.jpg')] bg-no-repeat bg-cover ">
          <div className="flex flex-col gap-8 w-full sm:w-3/4 md:3/5 lg:1/2 h-full items-center justify-center mx-auto text-white">
            <h2 className="uppercase font-san text-base md:text-xl text-center font-bold">Welcome to Agri Review Hub</h2>
            <h1 className="font-lobster text-5xl sm:text-6xl md:text-7xl text-center">Agriculture & Reviews</h1>
            <p className="w-full md:w-1/2 font-bold text-center mx-2">
              AGRI-REVIEW-HUB is your go-to resource for comprehensive reviews and insights
              on the latest agricultural products.
            </p>
            <Link
              href='/category'
              className="bg-primary-600 hover:scale-105 transition-all p-3 rounded flex gap-2 items-center sm:text-xl"
            >
              <span>Discover More</span> <BsFillArrowRightCircleFill />
            </Link>
          </div>
        </section>

        <section className="w-full px-4 bg-gradient-to-t from-primary-500 to-yellow-600 mb-24">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 justify-center items-center translate-y-20">
            <div>
              <div className="">
                <Image
                  src={'/images/empowerment.jpg'}
                  alt="Empowerment"
                  width={400}
                  height={400}
                  className="w-72 h-64"
                />
              </div>
              <div className="relative -translate-y-8 w-3/4 bg-primary-500 mx-auto">
                <p className="uppercase text-center text-black py-3">Empowerment</p>
              </div>
            </div>
            <div>
              <div className="">
                <Image
                  src={'/images/innovation.jpg'}
                  alt="Innovation"
                  width={400}
                  height={400}
                  className="w-72 h-64"
                />
              </div>
              <div className="relative -translate-y-8 w-3/4 bg-primary-500 mx-auto">
                <p className="uppercase text-center text-black py-3">Innovation</p>
              </div>
            </div>
            <div>
              <div className="">
                <Image
                  src={'/images/community.jpg'}
                  alt="Community"
                  width={400}
                  height={400}
                  className="w-72 h-64"
                />
              </div>
              <div className="relative -translate-y-8 w-3/4 bg-primary-500 mx-auto">
                <p className="uppercase text-center text-black py-3">Community</p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-3 justify-center items-center lg:items-start lg:mt-36 mb-12 lg:mb-24 text-gray-900">
          <div className="p-4 flex flex-col gap-4 bg-background-100 rounded-xl mx-3 w-4/5 md:w-3/4 lg:w-1/2 lg:translate-x-24 translate-y-12">
            <Image
              src={'/images/agro_logo.png'}
              width={100}
              height={100}
              alt="image"
              className="w-10 h-10"
            />
            <p>Welcome to AGRI-REVIEW-HUB</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-primary-800 font-lobster">&quot;Better Agriculture for Better Future</h2>
            <div className="lg:w-4/5">
              <b className='text-primary-800'>In-Depth Product Reviews:</b>
              <p>
                Dive deep into unbiased reviews of the latest agricultural tools, equipment,
                fertilizers, pesticides, and more. Our team of experts rigorously tests and
                evaluates each product to provide you with honest and reliable information.
              </p>
              <b className='text-primary-800'>Community Engagement:</b>
              <p>
                Join our vibrant community of farmers and agripreneurs.
                Share your experiences and connect with like-minded individuals
                who are passionate about sustainable and efficient farming practices.
              </p>
              <b className='text-primary-800'>Latest Industry Trends:</b>
              <p>
                Stay informed about the latest trends and innovations in the agricultural industry.
                From smart farming technologies to sustainable practices, we keep you updated on
                the advancements that can benefit your farm.
              </p>
            </div>
            <Link
              href='/category'
              className="bg-primary-600 w-fit hover:scale-105 transition-all p-3 rounded flex gap-2 items-center sm:text-xl mx-auto"
            >
              <span>Discover More</span> <BsFillArrowRightCircleFill />
            </Link>
          </div>
          <Image
            src={'/images/bg10.jpg'}
            alt="cow_image"
            width={400}
            height={400}
            className="w-96 h-96"
          />
        </section>
      </div>
    </>
  )
}
