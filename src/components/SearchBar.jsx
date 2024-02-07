import React from "react";
import styles from "@/styles/Home.module.css";

function SearchBar({ handleSearch }) {
  return (
    <div>
      <input
        className={styles.searchBar}
        type="text"
        placeholder="Search by name, email or role"
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
}

export default SearchBar;
