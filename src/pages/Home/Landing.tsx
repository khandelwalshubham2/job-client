import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const jobProfiles = [
    { label: "FrontEnd Developer", keyword: "frontend" },
    { label: "BackEnd Developer", keyword: "backend" },
    { label: "HR Manager", keyword: "hr" },
  ];
  const browseJobs = () => {
    if (!inputRef.current?.value) return;
    navigate(`/browse?keyword=${inputRef.current.value}`);
  };
  return (
    <div className="space-y-4 text-center py-10">
      <Badge variant="secondary" className="text-primaryRed text-lg px-4 py-2">
        No.1 Job Hunt Website
      </Badge>
      <div>
        <p className="heading-1">Search, Apply &</p>
        <p className="heading-1">
          Get Your <span className="text-primaryPurple"> Dream Jobs</span>
        </p>
      </div>
      <p className="font-medium">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error,
        distinctio!
      </p>
      <div className="flex justify-center">
        <input
          ref={inputRef}
          type="text"
          className="w-4/5 max-w-[550px] focus:outline-none rounded-l-2xl px-2 border border-gray-400"
          placeholder="Find your dream job"
        />
        <div
          className="bg-primaryPurple px-4 py-2 rounded-r-2xl cursor-pointer"
          onClick={browseJobs}
        >
          <Search className="text-white" />
        </div>
      </div>
      <div className="space-x-4">
        {jobProfiles.map((profile) => (
          <Badge
            key={profile.label}
            variant="outline"
            className="py-2 px-3 cursor-pointer"
            onClick={() => {
              navigate(`/browse?keyword=${profile.keyword}`);
            }}
          >
            {profile.label}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Landing;
