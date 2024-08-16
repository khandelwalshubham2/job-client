import { RootState } from "@/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const RecruiterProtectedLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, userDetails } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    if (!isAuthenticated) return navigate("/login");
    if (userDetails.role === "student") return navigate("/jobs");
  }, [isAuthenticated, userDetails.role]);

  return <Outlet />;
};

export default RecruiterProtectedLayout;
