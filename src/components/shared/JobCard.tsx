import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "../ui/badge";
import { Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import { Job } from "@/types";
import { useNavigate } from "react-router-dom";

type Props = {
  job: Job;
};

const JobCard = ({ job }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="p-2 space-y-2 border border-slate-300 shadow-md">
      <div className="flex justify-between items-center">
        <p className="description-1">2 Days ago</p>
        {/* <Bookmark /> */}
      </div>

      <div className="flex items-center gap-1">
        <Avatar>
          <AvatarImage src={job.company.logo} />
          <AvatarFallback>N/A</AvatarFallback>
        </Avatar>
        <div className="heading-2">{job.company.name}</div>
      </div>
      <p className="heading-2">{job.title}</p>
      <p className="description-1">{job.description}</p>
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
      <Button
        variant="outline"
        onClick={() => {
          navigate("/job-description", { state: job });
        }}
      >
        Details
      </Button>
    </div>
  );
};

export default JobCard;
