import { Checkbox } from '../FormElements/Checkbox';
import { Select } from '../FormElements/Select';

interface IFilterProps {
  languages: string[];
}

export const FilterForm = (props: IFilterProps) => {
  const { languages } = props;
  return (
    <div className="p-6 rounded-lg shadow-lg border-2 bg-white">
      <form action="">
        <div className="flex flex-col flex-wrap justify-start items-start">
          <Select label="Language" placeholder="Filter by Language" options={languages} />
          <Checkbox label="Good First Issue" />
        </div>
      </form>
    </div>
  );
};
