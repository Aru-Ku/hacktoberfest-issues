import type { HTMLInputTypeAttribute } from 'react';

export interface InputProps {
  label: string;
  htmlFor?: string;
  id?: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  inputClasses?: string;
  labelClasses?: string;
}

const INPUT_DEFAULT_CLASSES = `orm-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 
bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out 
m-0 focus:text-gray-700 focus:ring-2 focus:bg-white focus:border-blue-600 `;

export const Input = (props: InputProps) => {
  const { label, htmlFor, id, placeholder, type = 'text', labelClasses = '', inputClasses = '' } = props;

  return (
    <div className="mb-3 xl:w-96">
      <label htmlFor={id || htmlFor} className={'form-label inline-block mb-2 text-gray-700 ' + labelClasses}>
        {label}
      </label>
      <input
        type={type}
        id={id || htmlFor}
        placeholder={placeholder}
        className={INPUT_DEFAULT_CLASSES + inputClasses}
      />
    </div>
  );
};

export const NumberInput = (props: Omit<InputProps, 'type'>) => <Input type="number" {...props} />;
