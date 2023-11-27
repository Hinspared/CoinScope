'use client';

import React from 'react';
import { IoMdClose } from 'react-icons/io';
import './loading.css';

interface Props {
  isOpen: boolean;
  showModal: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isLoading: boolean;
}

const Modal: React.FC<Props> = ({
  isOpen,
  showModal,
  onClose,
  children,
  title,
  isLoading,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="
          justify-center 
          items-center 
          flex 
          overflow-y-auto 
          fixed 
          overflow-x-hidden 
          inset-0 
          z-50 
          outline-none 
          focus:outline-none
          bg-neutral-800/70
        "
        onClick={onClose}
      >
        <div
          className="
          w-4/5
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-auto
          "
        >
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? 'translate-y-0' : 'translate-y-full'}
            ${showModal ? 'opacity-100' : 'opacity-0'}
          `}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="
              border-0 
              rounded-lg 
              relative 
              flex 
              flex-col 
              w-full 
              bg-white 
              outline-none 
              focus:outline-none
            "
            >
              <div className="w-full flex items-center flex-col">
                {isLoading && (
                  <div
                    className="absolute w-full h-full bg-neutral-800/70 flex items-center justify-center text-5xl"
                    style={{
                      zIndex: '30',
                    }}
                  >
                    <div className="loading">
                      <span>loading</span>
                    </div>
                  </div>
                )}

                <div className="flex py-6 items-center justify-center w-full px-6">
                  <IoMdClose
                    size={18}
                    className="mr-auto cursor-pointer text-neutral-900"
                    onClick={onClose}
                  />
                  <h1 className="font-semibold text-xl mr-auto text-neutral-900">
                    {title}
                  </h1>
                </div>
                <hr className="border-neutral-300 border-t-2 w-full" />
              </div>
              <div className="px-6 mb-3 flex flex-col gap-3">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

// const [showModal, setShowModal] = React.useState(isOpen);

// React.useEffect(() => {
//   onOpen();
// }, [isOpen, onOpen]);

// const handleClose = React.useCallback(() => {
//   onClose();
//   // setTimeout(() => {
//   //   onClose();
//   // }, 300);
// }, [onClose]);
