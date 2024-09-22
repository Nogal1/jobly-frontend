import React from "react";
import { Link } from "react-router-dom";

/** CompanyCard: renders individual company card */
function CompanyCard({ company }) {
  console.log("Company data:", company); // Add this line to check the received company data

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <Link to={`/companies/${company.handle}`}>{company.name}</Link>
        </h5>
        <p className="card-text">{company.description}</p>
      </div>
    </div>
  );
}

export default CompanyCard;
