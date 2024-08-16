import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Ellipsis, Eye, Pencil } from "lucide-react";
import { useGetRecruiterJobsQuery } from "@/store/apis/jobApi";
import { formatDate } from "@/utils/helper";
import { Link } from "react-router-dom";
const JobPostedTable = () => {
  const { data, isLoading } = useGetRecruiterJobsQuery();
  return isLoading ? (
    <p className="text-center heading-2">Loading...</p>
  ) : (
    <>
      {data.jobs.length === 0 ? (
        <p className="text-center heading-2">No Jobs are posted</p>
      ) : (
        <Table>
          <TableCaption>A list of your recent job posted.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.jobs.map((job: any) => (
              <TableRow key={job.id}>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{formatDate(job.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 space-y-2">
                      <Link
                        to={`/update-job/${job.id}`}
                        state={{
                          companyId: job.company.id,
                          companyName: job.company.name,
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <Pencil />
                          <span>Edit</span>
                        </div>
                      </Link>
                      <Link to={`/job-applicants/${job.id}`}>
                        <div className="flex items-center gap-1 mt-3">
                          <Eye />
                          <span>Applicants</span>
                        </div>
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default JobPostedTable;
