import React, { useState, useContext } from "react";
import JoblyApi from "../api";
import UserContext from "../UserContext";
import styles from "./JobCard.module.css";

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
    <div className={styles.JobCard}>
      <h3 className={styles.JobTitle}>{job.title}</h3>
      <p className={styles.JobDetails}>Company: {job.companyName}</p>
      <p className={styles.JobDetails}>Salary: {job.salary ? `$${job.salary}` : "N/A"}</p>
      <p className={styles.JobDetails}>Equity: {job.equity ? job.equity : "N/A"}</p>
      <button
        className={styles.ApplyButton}
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;

