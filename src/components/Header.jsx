
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SignInProfile from './SignIn/SignInProfile'

import Image from 'next/image'

const Header = () => {

  const links = [
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Blogs',
      href: '/blogs'
    },
    {
      title: 'Events',
      href: '/events'
    },
  ]

  return (
      <header className="flex items-center justify-between py-4">
        <div>
          <Link href="/" >
            <div className="flex items-center justify-between">
              <div className="mr-4">
                <div className="gap-2 w-28 h-28 relative mx-1 sm:mx-3 ">
                  <Image
                    alt='Agro Logo'
                    src='/images/agro_logo.png'
                    fill
                    sizes="(max-width: 100px) 100vw, (max-width: 120px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="hidden h-6 text-2xl font-semibold sm:block text-yellow-800">
                Agri Review Hub
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
        { links.map( (link) => 
            <Link
              key={link.title}
              href={link.href}
              className="hidden md:block font-medium text-gray-900 dark:text-gray-100 hover:bg-yellow-600 p-2 rounded"
            >
              {link.title}
            </Link>
        )}
          <SignInProfile />
          <ThemeSwitch />
          <MobileNav />
        </div>
      </header>
  )
}

export default Header
