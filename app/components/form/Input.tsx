'use client';
import { Field } from 'formik';
import React from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';

interface InputProps {
  type: string;
  name: string;
  errors: string | undefined;
  touched: boolean | undefined;
}

const Input: React.FC<InputProps> = ({ type, name, errors, touched }) => {
  return (
    <div className="w-full relative mb-3">
      <label
        htmlFor={name}
        className={`
        absolute
        text-md
        duration-150
        transform
        -translate-y-3
        top-5
        left-4
        z-10
        origin-[0]
      ${errors && touched ? 'text-rose-500' : 'text-zinc-400'}
      `}
      >
        {name}
      </label>
      <Field
        id={name}
        type={type}
        name={name}
        placeholder=" "
        className={`
          peer
          w-full
          p-4
          pt-6 
          font-light 
          bg-white 
          border-2
          rounded-md
          outline-none
          transition
          pl-4 
          border-neutral-300 
          ${errors && touched ? 'border-rose-500' : 'border-neutral-300'}
          ${errors && touched ? 'focus:border-rose-500' : 'focus:border-black'}
        `}
      />
      <div
        className={`gap-1 h-4 mt-1  flex items-center ${
          errors && touched ? 'visible' : 'invisible'
        }`}
      >
        <RiErrorWarningFill className="text-rose-500 text-sm" />
        <p className="text-rose-500 text-sm">{errors}</p>
      </div>
    </div>
  );
};

export default Input;
