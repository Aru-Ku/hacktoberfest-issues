import { SortValues } from "../../types"
import { Checkbox } from "../FormElements/Checkbox"
import { Select } from "../FormElements/Select"


type SortByOptionsType = { value: SortValues, text: string }

const SortByOptions: SortByOptionsType[] = [
  { value: 'created', text: 'Created' },
  { value: 'updated', text: 'Updated' },
]

const OrderByOptions = [
  { value: 'asc', text: 'Ascending' },
  { value: 'desc', text: 'Decending' }
]

export const FilterForm = () => {

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white">
      <form action="">
        <div className="flex flex-wrap justify-around items-center">
          <Select label="Sort By" options={SortByOptions} />
          <Select label="Order By" options={OrderByOptions} />
          <div>
            <Checkbox label="Good First Issue" id="good-first-issue" />
            <Checkbox label="Open Issues" id="open-issues" />
          </div>
        </div>
      </form>
    </div>
  )

}
