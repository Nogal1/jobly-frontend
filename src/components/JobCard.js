import React, { useState, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../UserContext";

/** JobCard: displays information about a job, and allows user to apply */
function JobCard({ job, hasApplied }) {
  const { currentUser, setCurrentUser } = useContext(UserContext); // Access current user context
  const [applied, setApplied] = useState(hasApplied); // Track whether the job has been applied to

  /** Handle job application */
  async function handleApply() {
    if (applied) return;
  
    try {
      await JoblyApi.applyToJob(currentUser.username, job.id); // Pass the username to the API
      setApplied(true); // Update UI to reflect application
  
      // Update the current user's applications in context
      setCurrentUser(u => ({
        ...u,
        applications: [...u.applications, job.id]
      }));
    } catch (err) {
      console.error("Job application failed", err);
    }
  }
  

  return (
    <div className="JobCard">
      <h3>{job.title}</h3>
      <p>{job.companyName}</p>
      <p>Salary: {job.salary ? `$${job.salary}` : "N/A"}</p>
      <p>Equity: {job.equity ? job.equity : "N/A"}</p>
      <button onClick={handleApply} disabled={applied}>
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;

