import AppliedJobsTable from "./AppliedJobsTable";
import ProfileDetails from "./ProfileDetails";

const Profile = () => {
  return (
    <div className="container py-5">
      <ProfileDetails />
      <AppliedJobsTable />
    </div>
  );
};

export default Profile;
