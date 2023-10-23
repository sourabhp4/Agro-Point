import React from 'react'

import Image from 'next/image'

import { BiLogoGmail, BiLogoGithub, BiLogoLinkedinSquare }
  from 'react-icons/bi'

const About = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 text-center text-yellow-900">
            &quot; WHERE QUALITY MEETS THE SOIL, AND EVERY PRODUCT TELLS A STORY. &quot;
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-2 pt-10">
            <div>
              <Image
                src='/images/agro_logo.png'
                alt="avatar"
                width={100}
                height={100}
                className="h-24 w-28 rounded-full"
              />
            </div>
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8  text-yellow-600">
              AGRI REVIEW HUB
            </h3>
            <div className="text-gray-500 dark:text-gray-400">A Website made for <b>FARMERS</b></div>
            <div className="pt-4 flex space-x-4 text-xl text-green-600">
              <a href="mailto: agropointofficial@gmail.com" target='_blank' rel='norefferer noopener'><BiLogoGmail /></a>
              <a href="https://github.com/sourabhp4/Agro-Point" target='_blank' rel='norefferer noopener'><BiLogoGithub /></a>
              <a href="https://www.linkedin.com/in/sourabh-p-a239a1228/" target='_blank' rel='norefferer noopener' ><BiLogoLinkedinSquare /></a>
            </div>
          </div>
          <div className='prose pb-2 pt-8 px-10 dark:prose-invert lg:col-span-2'>
            <p className='text-center text-lg'>
              <i>
              Welcome to <strong>Agri Review Hub</strong>, your trusted source for honest and insightful reviews 
              of products designed to enhance every aspect of agricultural life. We understand the 
              importance of making informed choices when it comes to the tools, equipment, and supplies 
              that drive the agricultural industry. That&apos;s why we&apos;re here to help you make the best 
              decisions for your farm or garden.
              </i>
            </p>
            <br />
            <hr />
            <br />
            <div>
              <b className='text-yellow-600'>Our Mission</b>
              <p>
                Collaborate with like-minded individuals, exchange ideas, and
                develop groundbreaking projects that will shape the future of
                technology.
              </p>
              <b className='text-yellow-600'>Expert Insights:</b>
              <p>
                To empower farmers, gardeners, and anyone involved in 
                agriculture with knowledge and confidence. We&apos;re passionate about the world 
                of agriculture and believe that the right products can make a world of difference 
                in your yields, efficiency, and overall satisfaction with your work.
              </p>
              <b className='text-yellow-600'>Get Involved:</b>
              <p>
                We believe in the power of collaboration 
                and welcome contributions from our community. 
                If you have experiences, tips, or product suggestions you&apos;d like to share, 
                please don&apos;t hesitate to get in touch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About