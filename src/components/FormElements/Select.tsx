export type IOption = { value: string; text: string }[] | string[];

export interface ISelectProps {
  label: string;
  options: IOption;
  placeholder?: string;
  labelClasses?: string;
  selectClasses?: string;
  optionClasses?: string;
  value: string | undefined;
  setValue: (value: string) => void;
}

const SELECT_DEFAULT_CLASSES = `block w-full mt-1 rounded-md border-gray-300 shadow-sm
  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-800 dark:border-gray-600 dark:focus:border-blue-300 dark:focus:ring-blue-200 dark:focus:ring-opacity-50 dark:ring-blue-800 dark:text-gray-300`;

export const Select = (props: ISelectProps) => {
  const {
    label,
    labelClasses = '',
    selectClasses = '',
    optionClasses = '',
    options,
    placeholder = '',
    value,
    setValue,
  } = props;

  return (
    <div className="my-2 w-full">
      <label className={'block' + labelClasses}>
        <span className="text-gray-700 dark:text-gray-100">{label}</span>
        <select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={SELECT_DEFAULT_CLASSES + selectClasses}
          placeholder={placeholder}
        >
          <option value="__NONE" className="text-gray-400 dark:text-gray-100">
            Filter by Language
          </option>
          {options.map((option) => {
            return typeof option === 'string' ? (
              <option className={optionClasses} key={option} value={option}>
                {option}
              </option>
            ) : (
              <option className={optionClasses} key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
};
