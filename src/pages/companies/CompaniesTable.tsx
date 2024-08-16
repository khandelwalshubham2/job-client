import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

import { CirclePlus, Ellipsis, Pencil } from "lucide-react";
import { useGetRecruiterCompaniesQuery } from "@/store/apis/companyApi";
import { formatDate } from "@/utils/helper";
import { Link } from "react-router-dom";

const CompaniesTable = () => {
  const { data, isLoading } = useGetRecruiterCompaniesQuery();
  return isLoading ? (
    <p className="text-center heading-2">Loading...</p>
  ) : (
    <>
      {data.companies.length === 0 ? (
        <p className="text-center heading-2">No company registerd</p>
      ) : (
        <Table>
          <TableCaption>A list of your recent companies.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.companies.map((company: any) => (
              <TableRow key={company.id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                    <AvatarFallback>N/A</AvatarFallback>
                  </Avatar>
                </TableCell>

                <TableCell>{company.name}</TableCell>
                <TableCell>{formatDate(company.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <Ellipsis />
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <Link to={`/update-company/${company.id}`}>
                        <div className="flex items-center gap-1">
                          <Pencil />
                          <span>Edit</span>
                        </div>
                      </Link>
                      <Link
                        to="/create-job"
                        state={{
                          companyId: company.id,
                          companyName: company.name,
                        }}
                      >
                        <div className="flex items-center gap-1 mt-3">
                          <CirclePlus />
                          <span>Create Job</span>
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

export default CompaniesTable;
