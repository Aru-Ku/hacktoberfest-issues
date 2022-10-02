export type IOption = { value: string; text: string }[] | string[];

export interface ISelectProps {
  label: string;
  options: IOption;
  placeholder?: string;
  labelClasses?: string;
  selectClasses?: string;
  optionClasses?: string;
}

const SELECT_DEFAULT_CLASSES = `block w-full mt-1 rounded-md border-gray-300 shadow-sm
  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 `;

export const Select = (props: ISelectProps) => {
  const { label, labelClasses = '', selectClasses = '', optionClasses = '', options, placeholder = '' } = props;

  return (
    <div className="my-2 w-full">
      <label className={'block' + labelClasses}>
        <span className="text-gray-700">{label}</span>
        <select className={SELECT_DEFAULT_CLASSES + selectClasses} placeholder={placeholder}>
          <option value={undefined} className="text-grey-400">
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
