'use client';

import { useCallback, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import useLoginModal from '@/app/utils/hooks/useLoginModal';
import useRegisterModal from '@/app/utils/hooks/useRegisterModal';
import MenuItem from './MenuItem';
import Avatar from '../Avatar';
import useOutsideClick from '@/app/utils/hooks/useOutsideClick';
import React from 'react';
import type { SafeUser } from '@/app/utils/types';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isOpen, setOpen] = useState(false);
  const clickOutside = useOutsideClick(() => setOpen(false));
  const ref = loginModal.isOpen || registerModal.isOpen ? null : clickOutside;

  const toggleOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center gap-3" ref={ref}>
        <div
          onClick={toggleOpen}
          className="
          p-4
          md:py-1
          md:px-2
          border-[1px] 
          border-neutral-200 
          flex 
          flex-row 
          items-center 
          gap-3 
          rounded-full 
          cursor-pointer 
          hover:shadow-md 
          transition
          "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
            absolute 
            rounded-xl 
            shadow-md
            bg-white 
            overflow-hidden 
            right-0 
            top-12 
            text-sm
          "
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => router.push('/trips')}
                />
                <MenuItem
                  label="My favorites"
                  onClick={() => router.push('/favorites')}
                />
                <MenuItem
                  label="My reservations"
                  onClick={() => router.push('/reservations')}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => router.push('/properties')}
                />
                <hr />
                {/* <MenuItem label="Logout" onClick={() => signOut()} /> */}
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />
                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
