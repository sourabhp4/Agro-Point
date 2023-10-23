import React from 'react';

const Modal = ({ isOpen, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-80">  
            {children}
        </div>
    </>
  );
};

export default Modal;