import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import FilterCard from "./FilterCard";
import Job from "./Job";
import Footer from "./shared/Footer";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

function Jobs() {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJob] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return job.title.toLowerCase().includes(searchedQuery.toLowerCase()) || job.description.toLowerCase().includes(searchedQuery.toLowerCase()) || job.location.toLowerCase().includes(searchedQuery.toLowerCase())
      });
      setFilterJob(filteredJobs);
    } else {
      setFilterJob(allJobs);
    }
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex flex-wrap gap-5">
          <div className="w-full md:w-1/4 lg:w-1/5 xl:w-1/4">
            <FilterCard />
          </div>
          {filterJobs.length <= 0 ? (
            <span className="text-lg font-bold text-gray-500">
              Job not found
            </span>
          ) : (
            <div className="flex-1 h-screen overflow-y-auto pb-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-2">
                {filterJobs.map((job) => (
                  <div>
                    <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}>
                      <Job job={job}></Job>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Jobs;
