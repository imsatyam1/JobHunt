import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import Footer from "./shared/Footer";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const isResume = true;
function Profile() {
  useGetAppliedJobs();
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user?.profile?.profilePhoto} alt="Profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2 mx-6">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-4 mx-6">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        {user.workstatus === "employee" ? (
          <>
            <div className="my-5">
              <h1 className="font-bold text-lg mx-3">Skills</h1>
              <div className="flex items-center gap-3 p-3">
                {user?.profile?.skills.length !== 0 ? (
                  user?.profile?.skills.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))
                ) : (
                  <span>NA</span>
                )}
              </div>
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label className="font-bold text-lg mx-3">Resume</Label>
              {isResume ? (
                <a
                  target="blank"
                  href={user.profile.resumeOriginalName}
                  className="text-blue-500 w-full hover:underline cursor-pointer"
                ></a>
              ) : (
                <span>NA</span>
              )}
            </div>
            <div className="max-4xl mx-auto bg-white rounded-2xl">
              <h1 className="font-bold text-lg my-5 mx-3">Applied Jobs</h1>
              {/* Applied Jobs */}
              <AppliedJobTable />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      </div>
      <Footer className="mt-auto"/>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Profile;
