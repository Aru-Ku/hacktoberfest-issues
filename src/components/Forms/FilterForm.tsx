import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import { Checkbox } from '../FormElements/Checkbox';
import { Select } from '../FormElements/Select';

export interface FilterItems {
  goodFirstIssue: boolean;
  language: string | undefined;
}

type keysOfFormItems = keyof FilterItems;

interface IFilterProps {
  languages: string[];
  values: FilterItems;
  setValues: Dispatch<SetStateAction<FilterItems>>;
}

export const FilterForm = (props: IFilterProps) => {
  const { languages, setValues, values } = props;

  const setValue = (item: keysOfFormItems, value: FilterItems[keysOfFormItems]) => {
    setValues((prev) => ({
      ...prev,
      [item]: value,
    }));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg border-2 bg-white dark:bg-gray-900">
      <form action="">
        <div className="flex flex-col flex-wrap justify-start items-start">
          <Select
            label="Language"
            placeholder="Filter by Language"
            options={languages}
            value={values.language}
            setValue={(value) => setValue('language', value)}
          />
          <Checkbox
            label="Good First Issue"
            value={values.goodFirstIssue}
            setValue={(value) => setValue('goodFirstIssue', value)}
          />
        </div>
      </form>
    </div>
  );
};
