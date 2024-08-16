import { Separator } from "@/components/ui/separator";
import FilterCategory from "./FilterCategory";

type Props = {
  searchFilter: { location: string; profile: string };
  setsearchFilter: React.Dispatch<
    React.SetStateAction<{
      location: string;
      profile: string;
    }>
  >;
};

const JobsFilter = ({ searchFilter, setsearchFilter }: Props) => {
  const locations = ["Delhi", "Noida", "Jaipur"];
  const jobProfiles = ["FrontEnd", "BackEnd", "DevOps"];
  const changeFilters = (filterType: String, value: string) => {
    setsearchFilter((prev) => {
      return { ...prev, [filterType as keyof typeof searchFilter]: value };
    });
  };
  return (
    <div className="">
      <p className="heading-2">Filter Jobs</p>
      <Separator className="mt-1" />
      <FilterCategory
        type="Location"
        filterList={locations}
        value={searchFilter.location}
        changeFilters={changeFilters}
      />
      <FilterCategory
        type="Profile"
        filterList={jobProfiles}
        value={searchFilter.profile}
        changeFilters={changeFilters}
      />
    </div>
  );
};

export default JobsFilter;
