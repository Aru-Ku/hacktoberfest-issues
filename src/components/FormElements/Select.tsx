
export type IOption =
  { value: string, text: string }[]
  | string[];

export interface ISelectProps {
  label: string;
  options: IOption;
  htmlFor?: string;
  id?: string;
  placeholder?: string;
  labelClasses?: string;
  selectClasses?: string;
  optionClasses?: string;
}

const SELECT_DEFAULT_CLASSES =
  `form-select appearance-none block w-full px-3 py-1.5 text-base font-normal
text-gray-700 bg-white bg-clip-padding bg-no-repeat rounded
border border-solid border-gray-300 transition ease-in-out m-0
focus:text-gray-700 focus:bg-white focus:ring-1 focus:border-blue-600 focus:outline-none `;

export const Select = (props: ISelectProps) => {
  const {
    label, htmlFor, id, labelClasses = "", selectClasses = "", optionClasses = "", options, placeholder = ""
  } = props;

  return (
    <div className="mb-3 xl:w-96">
      <label htmlFor={id || htmlFor} className={"form-label inline-block mb-2 text-gray-700 " + labelClasses}>{label}</label>
      <select className={SELECT_DEFAULT_CLASSES + selectClasses} placeholder={placeholder}>
        {options.map(option => {
          return typeof option === 'string'
            ? <option className={optionClasses} key={option} value={option}>{option}</option>
            : <option className={optionClasses} key={option.value} value={option.value}>{option.text}</option>
        })}
      </select>
    </div>
  )
}
