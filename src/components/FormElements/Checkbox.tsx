export interface ICheckboxProps {
  label: string;
  inputClasses?: string;
  labelClasses?: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

const CHECKBOX_INPUT_DEFAULT_CLASSES = `rounded border-grey-300 shadow-sm text-gray-700 focus:border-blue-600
focus:border-transparent focus:ring-1 focus:ring-offset-2 focus:border-blue-600 `;

export const Checkbox = (props: ICheckboxProps) => {
  const { label, inputClasses = '', labelClasses = '', value, setValue } = props;

  return (
    <div className="block mt-2 w-full">
      <label className={'inline-flex items-center' + labelClasses}>
        <input
          type="checkbox"
          checked={value}
          onChange={() => setValue(!value)}
          className={CHECKBOX_INPUT_DEFAULT_CLASSES + inputClasses}
        />
        <span className="ml-2">{label}</span>
      </label>
    </div>
  );
};
