
import Link from 'next/link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SignInProfile from './SignIn/SignInProfile'

import Image from 'next/image'
import SearchBar from './SearchBar'

const Header = () => {

  const links = [
    {
      title: 'Home',
      href: '/'
    },
    {
      title: 'About',
      href: '/about'
    },
    {
      title: 'Categories',
      href: '/category'
    }
  ]

  return (
      <header className="z-30 fixed top-0 w-full flex items-center justify-between py-4 px-4 backdrop-blur-md">
        <div>
          <Link href="/" >
            <div className="flex items-center justify-between">
              <div className="mr-4">
                <div className="gap-2 w-12 h-12 relative mx-1 sm:mx-2 ">
                  <Image
                    alt='Agro Logo'
                    src='/images/agro_logo1.png'
                    priority={false}
                    fill
                    sizes="(max-width: 100px) 100vw, (max-width: 120px) 50vw, 33vw"
                  />
                </div>
              </div>
              <div className="hidden h-6 text-2xl font-semibold sm:block text-black">
                Agri Review Hub
              </div>
            </div>
          </Link>
        </div>
        <div className="flex items-center leading-5 space-x-4 sm:space-x-6">
          <SearchBar />
          { links.map( (link) => 
              <Link
                key={link.title}
                href={link.href}
                className="hidden md:block font-medium text-black hover:bg-gray-300 dark:hover:bg-gray-900 p-2 rounded"
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
