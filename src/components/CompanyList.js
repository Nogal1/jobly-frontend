import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";
import SearchForm from "./SearchForm";

/** CompanyList component to fetch and display all companies */
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
      setIsLoading(false);
    }
    getCompanies();
  }, []);

  // Search handler function
  async function handleSearch(searchTerm) {
    let companies = await JoblyApi.getCompanies(searchTerm);
    setCompanies(companies);
  }

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="CompanyList">
      <SearchForm search={handleSearch} />
      {companies.length ? (
        companies.map(c => (
          <CompanyCard
            key={c.handle}
            handle={c.handle}
            name={c.name}
            description={c.description}
          />
        ))
      ) : (
        <p>No companies found.</p>
      )}
    </div>
  );
}

export default CompanyList;
