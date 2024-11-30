import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

function LatestJobs() {
  const {allJobs} = useSelector(store => store.job);
  return (
    <div>
      <div className='max-w-full mx-auto my-20 md:my-30 lg:my-40'>
        <h1 className="text-4xl font-bold mx-3 md:text-5xl lg:text-6xl"><span className="text-blue-600">Latest & Top </span>Job Opening
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5'>
            {
            allJobs.length <= 0 ?<h2 className='text-blue-600'>No Jobs available</h2>: allJobs.slice(0,6).map((job) => <LatestJobCards key={job._id} job={job}/>) 
            }
        </div>
      </div>
    </div>
  )
}

export default LatestJobs