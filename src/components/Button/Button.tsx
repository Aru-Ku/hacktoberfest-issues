import { ReactNode } from 'react';

export interface IButtonProps {
  children: ReactNode;
  className?: string;
}

export const Button = (props: IButtonProps) => {
  const { className = '', children } = props;

  return (
    <button
      type="button"
      className={
        'flex flex-row items-center justify-between p-2 focus:outline-none focus:ring-1 focus:ring-blue-600 hover:text-blue-600 hover:underline' +
        className
      }
    >
      {children}
    </button>
  );
};
