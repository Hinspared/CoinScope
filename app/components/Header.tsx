'use client';
import React from 'react';
import { RxDividerVertical } from 'react-icons/rx';
import useRegisterModal from '../utils/hooks/useRegisterModal';
import useLoginModal from '../utils/hooks/useLoginModal';
import { type SafeUser } from '../utils/types';

interface HeaderProps {
  currentUser: SafeUser | null;
}

const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  return (
    <>
      <div className="flex justify-center mt-28 mb-12 flex-col items-center gap-5">
        <p className="text-2xl md:text-4xl bg-gradient-to-r from-[#452e89] to-[#0f042e] text-center text-transparent bg-clip-text font-semibold dark:text-[#eaebf5]">
          MOST ADVANCED CRYPTO TRACKING PLATFORM
        </p>
        <div
          className={`${
            currentUser ? 'opacity-0 cursor-default' : ''
          } flex justify-center gap-3 items-center text-xl`}
        >
          <p
            className={`text-indigo-500 text-sm md:text-base ${
              currentUser ? 'cursor-default' : 'cursor-pointer'
            }`}
            onClick={registerModal.onOpen}
          >
            Create Account
          </p>
          <RxDividerVertical className="text-2xl text-[#9A97AB]" />
          <div className="flex flex-col md:flex-row text-sm md:text-base gap-x-3">
            <p className="text-[#9A97AB]">Already Registered?</p>
            <p
              className={`text-indigo-500 ${
                currentUser ? 'cursor-default' : 'cursor-pointer'
              }`}
              onClick={loginModal.onOpen}
            >
              Log in
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
