'use client';
import React from 'react';
import type { SafeUser } from '@/app/utils/types';
import { BsSunFill, BsMoonFill, BsMoon, BsSun } from 'react-icons/bs';
import { useTheme } from 'next-themes';
import useRegisterModal from '@/app/utils/hooks/useRegisterModal';
import useLoginModal from '@/app/utils/hooks/useLoginModal';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const { theme, setTheme } = useTheme();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  return (
    <div className="w-full sticky top-0 z-10 bg-[#eaebf5] dark:bg-[#0d0e30]">
      <div className="py-4">
        <div className="max-w-[2520px] mx-auto xl:px-20 m:px-10 sm:px-2 px-4">
          <div className="flex items-center justify-end">
            <Link href="/" className="flex items-center mr-auto">
              <Image
                src="/images/logo.webp"
                alt="logo"
                width={40}
                height={40}
              />
              <p className="text-4xl text-neutral-900 dark:text-[#9A97AB]">
                coinscope
              </p>
            </Link>
            <div className="flex gap-5 items-center text-[#9A97AB] cursor-pointer">
              {/* {currentUser ? (
                <p className="text-xl" onClick={() => signOut()}>
                  Sign out
                </p>
              ) : (
                <>
                  <p className="text-xl" onClick={registerModal.onOpen}>
                    Register
                  </p>
                  <p className="text-xl" onClick={loginModal.onOpen}>
                    Log in
                  </p>
                </>
              )} */}

              <div className="flex rounded-lg">
                <div
                  className="p-2 bg-blue-200 dark:bg-transparent rounded-l-lg"
                  onClick={() => setTheme('light')}
                >
                  {theme !== 'dark' ? (
                    <BsSunFill size={18} className="text-blue-400" />
                  ) : (
                    <BsSun size={18} />
                  )}
                </div>
                <div
                  className="bg-white p-2 rounded-r-lg dark:bg-[#211655]"
                  onClick={() => setTheme('dark')}
                >
                  {theme === 'dark' ? (
                    <BsMoonFill size={18} className="text-[#c9d9fc]" />
                  ) : (
                    <BsMoon size={18} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
