import React, { useState, useEffect, useContext } from "react";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import UserContext from "../UserContext";

/** JobList: renders a list of JobCards */
function JobList() {
  const [jobs, setJobs] = useState([]);
  const { currentUser } = useContext(UserContext); // Access current user context

  useEffect(() => {
    async function fetchJobs() {
      try {
        const jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
      }
    }

    fetchJobs();
  }, []);

  return (
    <div className="JobList">
      {jobs.length ? (
        jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            hasApplied={currentUser.applications.includes(job.id)} // Check if the user has applied
          />
        ))
      ) : (
        <p>Loading jobs...</p>
      )}
    </div>
  );
}

export default JobList;

