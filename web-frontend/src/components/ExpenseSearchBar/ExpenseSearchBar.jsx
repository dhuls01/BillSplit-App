import React from 'react';
import './ExpenseSearchBar.css';

const ExpenseSearchBar = ({ handleSearch }) => {
  return (
    <div className="expense-search-bar">
      <div className="form-input">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          className="search-bar"
          type="text"
          onChange={handleSearch}
          placeholder="Search expense"
        />
      </div>
    </div>
  );
};

export default ExpenseSearchBar;
