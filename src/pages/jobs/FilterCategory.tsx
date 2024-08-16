import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  type: string;
  filterList: string[];
  value: string;
  changeFilters: (filterType: String, value: string) => void;
};

const FilterCategory = ({ type, filterList, value, changeFilters }: Props) => {
  return (
    <div className="mt-3 space-y-2">
      <p className="heading-2">{type}</p>
      <RadioGroup
        defaultValue={value}
        onValueChange={(updateValue) => {
          changeFilters(type.toLowerCase(), updateValue);
        }}
      >
        {filterList.map((item) => (
          <div className="flex items-center space-x-2" key={item}>
            <RadioGroupItem value={item} id={item} />
            <Label htmlFor={item}>{item}</Label>
          </div>
        ))}
      </RadioGroup>

      {/* {filterList.map((item) => (
        <div key={item} className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {item}
          </label>
        </div>
      ))} */}
    </div>
  );
};

export default FilterCategory;
