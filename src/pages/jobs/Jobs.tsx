import JobCard from "@/components/shared/JobCard";
import JobsFilter from "./JobsFilter";
import { useState } from "react";
import { useGetAllJobsQuery } from "@/store/apis/jobApi";
import { Job } from "@/types";

const Jobs = () => {
  const [searchFilter, setsearchFilter] = useState({
    location: "Jaipur",
    profile: "FrontEnd",
  });
  const createSearchParamsUrl = () => {
    const searchParams = new URLSearchParams();
    searchParams.set("location", searchFilter.location);
    searchParams.set("profile", searchFilter.profile);
    return searchParams.toString();
  };
  const { data, isLoading } = useGetAllJobsQuery(`?${createSearchParamsUrl()}`);
  return (
    <div className="container grid md:grid-cols-[1fr_4fr] py-5 gap-4">
      <JobsFilter
        searchFilter={searchFilter}
        setsearchFilter={setsearchFilter}
      />
      {isLoading ? (
        <p className="text-center heading-2">Loading...</p>
      ) : (
        <>
          {data.jobs.length === 0 ? (
            <p className="text-center heading-2">No Jobs are posted</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.jobs.map((job: Job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Jobs;
