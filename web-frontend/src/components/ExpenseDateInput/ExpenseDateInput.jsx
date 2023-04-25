import React from 'react';
import DatePicker from 'react-date-picker';
import './ExpenseDateInput.css';

const ExpenseDateInput = ({ date, handleDateChange }) => {
  return (
    <div className="form-label-input">
      <DatePicker
        value={date}
        onChange={handleDateChange}
        format="dd/MM/yyyy"
      />
    </div>
  );
};

export default ExpenseDateInput;
