'use client'

import { useState } from 'react'

import SignIn from './SignIn'
import Modal from '../Modal'

const SignInButton =  (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='w-max'>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <SignIn closeModal={closeModal} />
      </Modal>
      <button
        className="md:block font-medium text-gray-900 bg-yellow-300 p-2 rounded hover:scale-110"
        onClick={() => setIsModalOpen(true)}
      >
        {props.buttonText}
      </button>
    </div>
  )
}

export default SignInButton
