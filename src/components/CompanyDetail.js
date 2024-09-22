import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "./JobCard";
import UserContext from "../UserContext";

/** CompanyDetail: Show detail about a company and its jobs */
function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const { currentUser } = useContext(UserContext); // Access current user context

  useEffect(() => {
    async function fetchCompany() {
      try {
        const company = await JoblyApi.getCompany(handle);
        setCompany(company);
      } catch (err) {
        console.error("Failed to fetch company", err);
      }
    }

    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div className="CompanyDetail">
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <div>
        <h3>Available Jobs</h3>
        {company.jobs.map(job => (
          <JobCard
            key={job.id}
            job={job}
            hasApplied={currentUser.applications.includes(job.id)} // Check if the user has applied
          />
        ))}
      </div>
    </div>
  );
}

export default CompanyDetail;
