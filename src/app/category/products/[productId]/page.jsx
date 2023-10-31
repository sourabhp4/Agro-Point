'use client'


import ContentLock from '@/components/ContentLock'
import { useSession } from 'next-auth/react'

const ProductSpecific = (props) => {
  
  const productId = props.params?.productId
  console.log('ProductId: ', productId)

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