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
    <div className="container">
      <div className="row">
        {jobs.length ? (
          jobs.map((job) => (
            <div className="col-md-4 mb-4" key={job.id}>
              <JobCard
                job={job}
                hasApplied={currentUser.applications.includes(job.id)}
              />
            </div>
          ))
        ) : (
          <p>Loading jobs...</p>
        )}
      </div>
    </div>
  );
}

export default JobList;

