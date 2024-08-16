import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  useGetJobApplicantsQuery,
  useUpdateApplicationStatusMutation,
} from "@/store/apis/applicationApi";
import { Application } from "@/types";
import { formatDate } from "@/utils/helper";
import { Check, Ellipsis, X } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
const JobApplicantsTable = () => {
  const { jobId } = useParams();
  const { data, isLoading } = useGetJobApplicantsQuery(jobId as string);
  const [updateStatus] = useUpdateApplicationStatusMutation();
  const submitStatus = async (applicationId: string, status: string) => {
    try {
      await updateStatus({ id: applicationId, status }).unwrap();
      toast.success("status successfully updated");
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return isLoading ? (
    <p className="text-center heading-2">Loading...</p>
  ) : (
    <>
      {data.applications.length === 0 ? (
        <p className="text-center heading-2">Currently,No Applicants</p>
      ) : (
        <Table>
          <TableCaption>A list of Job Applicants.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.applications.map((application: Application) => (
              <TableRow key={application.id}>
                <TableCell>{application.applicant.fullName}</TableCell>
                <TableCell>{application.applicant.email}</TableCell>
                <TableCell>
                  {application.applicant.phoneNumber
                    ? application.applicant.phoneNumber
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {application.applicant.profile.resumeName ? (
                    <a
                      target="blank"
                      className="text-blue-500 w-full hover:underline cursor-pointer"
                      href={application.applicant.profile.resume}
                    >
                      {application.applicant.profile.resumeName}
                    </a>
                  ) : (
                    <span>N/A</span>
                  )}
                </TableCell>
                <TableCell>{formatDate(application.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-40 space-y-2">
                      <PopoverClose>
                        <>
                          <div
                            className="flex items-center gap-1"
                            onClick={() => {
                              submitStatus(application.id, "accepted");
                            }}
                          >
                            <Check className="text-green-600" />
                            <span>Accept</span>
                          </div>

                          <div
                            className="flex items-center gap-1"
                            onClick={() => {
                              submitStatus(application.id, "rejected");
                            }}
                          >
                            <X className="text-red-600" />
                            <span>Reject</span>
                          </div>
                        </>
                      </PopoverClose>
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

export default JobApplicantsTable;
