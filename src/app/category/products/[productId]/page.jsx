'use client'

import { useState } from 'react'

import ContentLock from '@/components/ContentLock'
import useAuth from '@/lib/useAuth'

const ProductSpecific = (props) => {
  
  const productId = props.params?.productId
  console.log('ProductId: ', productId)

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useState(async () => {
    const status = await useAuth()
    setIsAuthenticated(status)
  })

  return (
    <>
      <div>
          <h1 className='text-center'>Product Specific Page</h1>
        {isAuthenticated ? 
          <h1>Product Content</h1>
          :
          <ContentLock />
        }
      </div>
    </>
  )
}

export default ProductSpecific