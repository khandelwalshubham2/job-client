import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";

const Companies = () => {
  const navigate = useNavigate();
  return (
    <div className="container lg:py-10 py-5">
      <div className="flex items-center">
        {/* <Input className="w-64" /> */}
        <Button className="ml-auto" onClick={() => navigate("/create-company")}>
          Create Company
        </Button>
      </div>
      <CompaniesTable />
    </div>
  );
};

export default Companies;
