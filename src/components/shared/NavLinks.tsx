import { Button } from "@/components/ui/button";
import { NAVLINKS } from "@/utils/constant";
import { Link, useNavigate } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "@/store/slices/userSlice";
import { useLogoutMutation } from "@/store/apis/authApi";
import { RootState } from "@/store";

type Props = {
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavLinks = ({ setOpen }: Props) => {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const { isAuthenticated, userDetails: user } = useSelector(
    (state: RootState) => state.user
  );
  const navLinks = NAVLINKS;
  const logoutHandler = async () => {
    try {
      await logout({}).unwrap();
      dispatch(deleteUser());
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="nav-link flex flex-col md:flex-row items-center">
      <div className="flex flex-col md:flex-row items-center gap-4 mt-5 md:mt-0">
        {isAuthenticated && user.role === "recruiter" ? (
          <>
            <Link to="/companies">Companies</Link>
            <Link to="/jobs-posted">Jobs</Link>
          </>
        ) : (
          <>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => {
                  if (setOpen) setOpen(false);
                }}
              >
                <span key={link.label} className="font-semibold">
                  {link.label}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
      {!isAuthenticated ? (
        <div className="flex items-center gap-2 md:ml-12 mt-5 md:mt-0">
          <Button
            variant="outline"
            onClick={() => {
              navigate("/login");
              if (setOpen) setOpen(false);
            }}
          >
            Login
          </Button>
          <Button
            variant="outline"
            className="bg-primaryPurple text-white"
            onClick={() => {
              navigate("/signup");
              if (setOpen) setOpen(false);
            }}
          >
            Signup
          </Button>
        </div>
      ) : (
        <Popover>
          <PopoverTrigger asChild>
            <Avatar className="cursor-pointer ml-3">
              <AvatarImage
                src={
                  user?.profile?.profilePhoto || "https://github.com/shadcn.png"
                }
                alt="@shadcn"
              />
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="">
              <div className="flex gap-2 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullName}</h4>
                  <p className="text-sm text-muted-foreground">
                    {user?.profile?.bio}
                  </p>
                </div>
              </div>
              <div className="flex flex-col my-2 text-gray-600">
                {user && user.role === "student" && (
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <User2 />
                    <Button variant="link">
                      {" "}
                      <Link to="/profile">View Profile</Link>
                    </Button>
                  </div>
                )}

                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <LogOut />
                  <Button onClick={logoutHandler} variant="link">
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default NavLinks;
