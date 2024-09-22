import React, { useState } from "react";

/** SearchForm component for filtering companies or jobs */
function SearchForm({ search }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    search(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  return (
    <div className="SearchForm">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default SearchForm;
