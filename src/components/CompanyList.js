import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard"; // Assuming you have a component to render each company

/** CompanyList: renders a list of CompanyCards */
function CompanyList() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companies = await JoblyApi.getCompanies();
        setCompanies(companies);
      } catch (err) {
        console.error("Failed to fetch companies", err);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Companies</h1>
      <div className="row">
        {companies.length ? (
          companies.map(company => (
            <div className="col-md-6 mb-4" key={company.handle}>
              <CompanyCard company={company} />
            </div>
          ))
        ) : (
          <p>Loading companies...</p>
        )}
      </div>
    </div>
  );
}

export default CompanyList;
