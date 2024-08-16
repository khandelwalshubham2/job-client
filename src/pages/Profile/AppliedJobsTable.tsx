import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserApplicationsQuery } from "@/store/apis/applicationApi";
import { Application } from "@/types";
import { formatDate } from "@/utils/helper";

const AppliedJobsTable = () => {
  const { data, isLoading } = useGetUserApplicationsQuery();
  return isLoading ? (
    <p className="text-center heading-2">Loading...</p>
  ) : (
    <>
      {data.applications.length === 0 ? (
        <p className="text-center heading-2">Currently,No Applicants</p>
      ) : (
        <div className="space-y-2 mt-4">
          <p className="heading-2">Applied Jobs Status</p>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Company</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.applications.map((application: any) => (
                <TableRow key={application.id}>
                  <TableCell>{formatDate(application.createdAt)}</TableCell>
                  <TableCell>{application.job.title}</TableCell>
                  <TableCell>{application.job.company.name}</TableCell>
                  <TableCell className="text-right">
                    <Badge
                      className={`${
                        application.status === "pending"
                          ? "bg-yellow-400"
                          : application.status === "accepted"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      {application.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );
};

export default AppliedJobsTable;
