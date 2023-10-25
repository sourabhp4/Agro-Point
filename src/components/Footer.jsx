
import { BiLogoGmail, BiLogoGithub, BiLogoLinkedinSquare } 
  from 'react-icons/bi'

export default function Footer() {
  return (
    <footer>
      <div className="mt-8 flex flex-col items-center">
        <div className="mb-3 flex space-x-4 text-xl text-green-600">
          <a href="mailto: agropointofficial@gmail.com" target='_blank' rel='norefferer noopener'><BiLogoGmail /></a>
          <a href="https://github.com/sourabhp4/Agro-Point" target='_blank' rel='norefferer noopener'><BiLogoGithub /></a>
          <a href="https://www.linkedin.com/in/sourabh-p-a239a1228/" target='_blank' rel='norefferer noopener' ><BiLogoLinkedinSquare /></a>
        </div>
        <div className="mb-2 flex flex-col sm:flex-row space-x-2 text-sm text-gray-500 dark:text-gray-400 text-center">
          <div>{` • `} Made with &#x2764; <span className='inline sm:hidden'>{` • `}</span></div>
          <div>{` • `}{`© ${new Date().getFullYear()}`} <span className='inline sm:hidden'>{` • `}</span> </div>
          <div>{` • `} By <a href="https://sourabhp.vercel.app/" rel='noreferrer noopener' target='_blank' className='hover:underline'>SOURABH P</a> {` • `}</div>
        </div>
      </div>
    </footer>
  )
}
