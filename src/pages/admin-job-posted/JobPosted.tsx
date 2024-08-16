import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobPostedTable from "./JobPostedTable";

const JobPosted = () => {
  return (
    <div className="container lg:py-10 py-5">
      <div className="flex items-center justify-between">
        {/* <Input className="w-64" /> */}
      </div>
      <JobPostedTable />
    </div>
  );
};

export default JobPosted;
