import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RootState } from "@/store";
import { useSubmitApplicationMutation } from "@/store/apis/applicationApi";
import { Job } from "@/types";
import { formatDate } from "@/utils/helper";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const JobDescription = () => {
  const { isAuthenticated, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  const { state: job }: { state: Job } = useLocation();
  const navigate = useNavigate();
  const [submitApplication, { isLoading }] = useSubmitApplicationMutation();
  const handleApply = async () => {
    try {
      await submitApplication({
        job: job.id,
        applicant: userDetails.id,
      }).unwrap();
      toast.success("You have successfully applied");
    } catch (error) {
      toast.error("You have already applied");
    }
  };
  return !job ? (
    <p className="text-center heading-1">No job exist</p>
  ) : (
    <div className="container space-y-3 py-4">
      <div className="flex items-center justify-between">
        <div className="heading-2">{job.title}</div>
        {isAuthenticated ? (
          <Button onClick={handleApply}>Apply</Button>
        ) : (
          <Button
            disabled={isLoading}
            className="disabled:opacity-60"
            onClick={() => navigate("/login")}
          >
            Login to Apply
          </Button>
        )}
      </div>
      <div className="flex items-center gap-1">
        {/* <Badge
          variant="outline"
          className="px-3 py-2 font-bold text-primaryBlue"
        >
          12 Positions
        </Badge> */}
        <Badge
          variant="outline"
          className="px-3 py-2 font-bold text-primaryRed"
        >
          Full Time
        </Badge>
        <Badge
          variant="outline"
          className="px-3 py-2 font-bold text-primaryPurple"
        >
          {job.salary} LPA
        </Badge>
      </div>
      <div className="text-lg font-semibold">Job Description</div>
      <Separator />
      <div className="space-y-1">
        <div className="space-x-2">
          <span className="text-base font-semibold">Company</span>:{" "}
          <span className="text-gray-600">{job.company.name}</span>
        </div>
        <div className="space-x-2">
          <span className="text-base font-semibold">Location</span>:{" "}
          <span className="text-gray-600">{job.location}</span>
        </div>
        <div className="space-x-2">
          <span className="text-base font-semibold">Description</span>:{" "}
          <span className="text-gray-600">{job.description}</span>
        </div>
        <div className="space-x-2">
          <span className="text-base font-semibold">Experience</span>:{" "}
          <span className="text-gray-600">{job.experienceYears} Years</span>
        </div>
        <div className="space-x-2">
          <span className="text-base font-semibold">Salary</span>:{" "}
          <span className="text-gray-600">{job.salary} Lakhs</span>
        </div>
        <div className="space-x-2">
          <span className="text-base font-semibold">Posted Date</span>:{" "}
          <span className="text-gray-600">{formatDate(job.createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
