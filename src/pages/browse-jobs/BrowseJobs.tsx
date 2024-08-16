import JobCard from "@/components/shared/JobCard";
import { useGetAllJobsQuery } from "@/store/apis/jobApi";
import { Job } from "@/types";
import { useSearchParams } from "react-router-dom";

const BrowseJobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryKeyword = searchParams.get("keyword") || "";
  //console.log(queryKeyword);
  const { data, isLoading } = useGetAllJobsQuery(`?keyword=${queryKeyword}`);
  return isLoading ? (
    <p className="text-center heading-2">Loading...</p>
  ) : (
    <>
      {data.jobs.length === 0 ? (
        <p className="text-center heading-2">No Jobs are posted</p>
      ) : (
        <div className="container grid md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
          {data.jobs.map((job: Job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </>
  );
};

export default BrowseJobs;
