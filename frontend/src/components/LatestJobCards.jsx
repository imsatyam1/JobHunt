import React, { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { setSingleCompany } from "@/redux/companySlice";
import { MapPin, MousePointerClick, SquareMousePointer } from "lucide-react";

function LatestJobCards({ job }) {
  const [company, setCompany] = useState(null);
  const companyID = job?.company?._id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCompanyHandler = async () => {
    if (!companyID) return; // Avoid API call if companyID is missing.
    try {
      const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyID}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCompany(res.data.company); // Update local state with company data.
        dispatch(setSingleCompany(res.data.company)); // Update Redux state if needed.
      } else {
        console.error("Failed to fetch company data:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    getCompanyHandler();
  }, [companyID]);

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="mx-3 p-3 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
    >
      <h1 className="flex font-medium text-xl">{job?.title}</h1>
      <div className="relative flex flex-grows mt-2 justify-between px-3">
        {company ? (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium font-semibold text-md capitalize flex items-center gap-2"
          >
            <div className="flex justify-start">
              {company.name}&nbsp;
              <SquareMousePointer className="text-blue-500" />
            </div>
          </a>
        ) : (
          <p className="text-sm">Loading company info...</p>
        )}

        <p className="flex justify-start text-sm text-gray-500 items-center gap-1 mt-2">
          <MapPin className="text-gray-500" />
          {job?.company?.location || "Location not available"}
        </p>
      </div>
      <div className="my-3">
        <hr />
        <h2 className="my-2 font-semibold">Job Requirements</h2>
        <div className="flex flex-wrap gap-1">
          {job?.requirements?.map((requirement, index) => (
            <span className="text-sm text-gray-600" key={index}>
              {requirement}
              {index < job.requirements.length - 1 && ","}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 font-semibold">
          Experience:{" "}
          <span className="font-normal">{job?.experienceLevel} Years</span>
        </p>
        <hr className="my-2" />
        <p className="flex text-sm text-gray-600">
          {job?.jobOverview}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge variant="ghost" className="text-blue-700 font-bold">
          Position - {job?.position}
        </Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">
          {job?.jobType}
        </Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;
