import { Bookmark, ChevronRight } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import useGetAllJobs from "@/hooks/useGetAllJobs";

function Job({ job }) {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDiffrence = currentTime - createdAt;
    return Math.floor(timeDiffrence / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="rounded-md shadow-xl bg-white border border-gray-100 p-3  md:p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-700">
          {daysAgoFunction(job?.createdAt) === 0
            ? "Today"
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg md:text-lg lg:text-xl capitalize">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-gray-500 md:text-base lg:text-md">
            {job?.company?.location}
          </p>
        </div>
      </div>

      <div>
  <h1 className="font-semibold text-lg md:text-xl lg:text-xl my-2">
    {job?.title || "Loading..."} {/* Fallback for job title */}
  </h1>
    <p className="text-sm text-gray-600">
      {job?.jobOverview}
    </p>
</div>

      <div className="flex justify-between">
      <div className="flex flex-col justify-start gap-2 w-fit mt-4 ">
        <div className="flex justify-between">
          <Badge variant="ghost" className={"text-blue-700 font-bold"}>
            Position :- {job?.position}
          </Badge>
          <Badge variant="ghost" className={"text-[#7209b7] font-bold"}>
            Experience: {job?.experienceLevel}
          </Badge>
        </div>
        <div className="flex justify-between">
          <Badge variant="ghost" className={"text-[#7209b7] font-bold"}>
            Salary: {job?.salary}
          </Badge>
          <Badge variant="ghost" className={"text-[#F83002] font-bold"}>
            Job Type: {job?.jobType}
          </Badge>
        </div>
      </div>
      <div className="flex items-end">
      <Button
      onClick={() => job?._id && navigate(`/description/${job._id}`)}
      variant="outline"
      size="icon"
      className="flex items-center bg-black text-white"
      aria-label="View job details"
    >
      <ChevronRight />
    </Button>
      </div>
      </div>
    </div>
  );
}

export default Job;
