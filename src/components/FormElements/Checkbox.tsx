export interface ICheckboxProps {
  label: string;
  htmlFor?: string;
  id?: string;
  inputClasses?: string;
  labelClasses?: string
}

const CHECKBOX_INPUT_DEFAULT_CLASSES =
  `form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white 
checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 
transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer `

export const Checkbox = (props: ICheckboxProps) => {
  const {
    label, htmlFor, id, inputClasses = "", labelClasses = ""
  } = props;

  return (
    <div className="form-check">
      <input className={CHECKBOX_INPUT_DEFAULT_CLASSES + inputClasses} type="checkbox" id={id || htmlFor} />
      <label className={"form-check-label inline-block text-gray-800 " + labelClasses} htmlFor={id || htmlFor}>
        {label}
      </label>
    </div>
  )
}
