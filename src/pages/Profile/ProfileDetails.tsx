import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Pencil, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import UpdateProfileForm from "./UpdateProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useState } from "react";

const ProfileDetails = () => {
  const { userDetails } = useSelector((state: RootState) => state.user);
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="border border-slate-300 shadow-md p-4 space-y-5">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <div className="heading-2">{userDetails.fullName}</div>
          <div className="description-1">
            {userDetails.profile.bio ? userDetails.profile.bio : "N/A"}
          </div>
        </div>
        <Button
          variant="outline"
          className="ml-auto"
          onClick={() => {
            setShowForm(true);
          }}
        >
          <Pencil />
        </Button>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          {/* <DialogTrigger asChild>
            <Button variant="outline" className="ml-auto">
              <Pencil />
            </Button>
          </DialogTrigger> */}
          <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <UpdateProfileForm setShowForm={setShowForm} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="contact-details">
        <div className="flex items-center gap-2">
          <Mail />
          <div>{userDetails.email}</div>
        </div>
        <div className="flex items-center gap-2">
          <Phone />
          <div>{userDetails.phoneNumber ? userDetails.phoneNumber : "N/A"}</div>
        </div>
      </div>
      <div className="skills">
        <div className="heading-2">Skills</div>
        <div className="flex items-center gap-2">
          {userDetails.profile.skills.length ? (
            userDetails.profile.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))
          ) : (
            <span>N/A</span>
          )}
        </div>
      </div>
      <div className="resume">
        <div className="heading-2">Resume</div>
        {userDetails.profile.resume ? (
          <a
            target="blank"
            className="text-blue-500 w-full hover:underline cursor-pointer"
            href={userDetails.profile.resume}
          >
            {userDetails.profile.resumeName}
          </a>
        ) : (
          <span> N/A </span>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
