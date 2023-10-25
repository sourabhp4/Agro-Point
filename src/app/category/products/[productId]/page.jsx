'use client'

import React from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { BsFillLockFill } from 'react-icons/bs'
import SignInButton from '@/components/SignIn/SignInButton'
import ContentLock from '@/components/ContentLock'

const ProductSpecific = () => {
  const router = useRouter()
  const productId = router.query?.productId
  console.log(productId)

  const { data: session } = useSession()

  return (
    <>
      <div>
          <h1 className='text-center'>Product Specific Page</h1>
        {session ? 
          <h1>Product Content</h1>
          :
          <ContentLock />
        }
      </div>
    </>
  )
}

export default ProductSpecific