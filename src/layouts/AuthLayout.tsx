import FormContainer from "./FormLayout";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <FormContainer>
      <Outlet />
    </FormContainer>
  );
};

export default AuthLayout;
