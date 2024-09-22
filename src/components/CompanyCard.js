import React from "react";
import { Link } from "react-router-dom";

/** CompanyCard component displays basic company info */
function CompanyCard({ handle, name, description }) {
  return (
    <div className="CompanyCard">
      <Link to={`/companies/${handle}`}>
        <h3>{name}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
}

export default CompanyCard;
