import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import StudentProtectedLayout from "./layouts/StudentProtectedLayout";
import Jobs from "./pages/jobs/Jobs";
import RecruiterProtectedLayout from "./layouts/RecruiterProtectedLayout";
import Companies from "./pages/companies/Companies";
import JobPosted from "./pages/admin-job-posted/JobPosted";
import CompanyForm from "./pages/common-form/CompanyForm";
import ManageJob from "./pages/create-job/ManageJob";
import BrowseJobs from "./pages/browse-jobs/BrowseJobs";
import JobDescription from "./pages/JobDescription/JobDescription";
import JobApplicants from "./pages/job-applicants/JobApplicants";
import Profile from "./pages/Profile/Profile";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/browse" element={<BrowseJobs />} />
      <Route path="/job-description" element={<JobDescription />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route element={<StudentProtectedLayout />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
      <Route element={<RecruiterProtectedLayout />}>
        <Route path="/companies" element={<Companies />} />
        <Route path="/create-company" element={<CompanyForm />} />
        <Route path="/jobs-posted" element={<JobPosted />} />
        <Route path="update-company/:companyId" element={<CompanyForm />} />
        <Route path="/create-job" element={<ManageJob />} />
        <Route path="/update-job/:jobId" element={<ManageJob />} />
        <Route path="/job-applicants/:jobId" element={<JobApplicants />} />
      </Route>
    </Route>
  )
);

export default router;
