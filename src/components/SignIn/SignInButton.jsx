'use client'

import { useState } from 'react'

import SignIn from './SignIn'
import Register from './Register'
import Modal from '../Modal'

const SignInButton =  (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRegister, setIsRegister] = useState(false)

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className='w-max'>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <SignIn closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} />
          <Register closeModal={closeModal} isRegister={isRegister} setIsRegister={setIsRegister} />
      </Modal>
      <button
        className="md:block font-medium text-white dark:text-gray-900 bg-primary-500 dark:bg-white p-2 rounded hover:scale-110 transition-all"
        onClick={() => setIsModalOpen(true)}
      >
        {props.buttonText}
      </button>
    </div>
  )
}

export default SignInButton
