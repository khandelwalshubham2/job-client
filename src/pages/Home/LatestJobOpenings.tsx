import JobCard from "@/components/shared/JobCard";

const LatestJobOpenings = () => {
  return (
    <div className="p-5">
      <p className="heading-1">
        <span className="text-primaryPurple">Latest & Top</span> Job Openings
      </p>
      <div className="mt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard />
        <JobCard /> */}
      </div>
    </div>
  );
};

export default LatestJobOpenings;
