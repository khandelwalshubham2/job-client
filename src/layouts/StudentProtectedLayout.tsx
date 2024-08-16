import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const StudentProtectedLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
    if (userDetails.role === "recruiter") return navigate("/companies");
  }, [isAuthenticated, userDetails.role]);

  return <Outlet />;
};

export default StudentProtectedLayout;
