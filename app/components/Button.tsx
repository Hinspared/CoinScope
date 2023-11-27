'use client';

import { type IconType } from 'react-icons';

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          outline
            ? 'bg-white border-neutral-900 text-neutral-900'
            : // : 'bg-rose-500 border-rose-500 text-white'
              'bg-indigo-500 border-indigo-500 text-white'
        }

        ${
          small
            ? 'text-sm py-1 font-light border'
            : 'text-md py-3 font-semibold border-2'
        }
      `}
    >
      {Icon && (
        <Icon
          size={24}
          className="
            absolute
            left-4
            top-3
          "
        />
      )}
      {label}
    </button>
  );
};

export default Button;
