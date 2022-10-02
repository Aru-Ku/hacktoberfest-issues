export interface ICheckboxProps {
  label: string;

  inputClasses?: string;
  labelClasses?: string;
}

const CHECKBOX_INPUT_DEFAULT_CLASSES = `rounded border-grey-300 shadow-sm text-gray-700 focus:border-blue-600
focus:border-transparent focus:ring-1 focus:ring-offset-2 focus:border-blue-600 `;

export const Checkbox = (props: ICheckboxProps) => {
  const { label, inputClasses = '', labelClasses = '' } = props;

  return (
    <div className="block mt-2 w-full">
      <label className={'inline-flex items-center' + labelClasses}>
        <input type="checkbox" className={CHECKBOX_INPUT_DEFAULT_CLASSES + inputClasses} />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};
