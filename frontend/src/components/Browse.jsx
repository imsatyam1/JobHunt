import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import Footer from "./shared/Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

function Browse() {
  useGetAllJobs();
  const {allJobs} = useSelector(store => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    }
  },[])
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow max-w-7xl mx-auto mb-5">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl my-4 md:my-6 lg:my-8 mx-2">
          Search Results ({allJobs.length})
        </h1>
        {allJobs.length > 0 ?(
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allJobs.map((job) => (
            <div key={job._id}>
              <Job key={job?._id} job={job} />
            </div>
          ))}
        </div>
        ):(
          <div className="text-xl">
            <p>No jobs are currently available. Please try again later.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Browse;
