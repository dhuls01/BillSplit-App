import React from 'react';

const ExpenseTitleInput = ({ handleTitleChange, status, defaultValue }) => {
  return (
    <div className="form-label-input">
      <input
        onChange={handleTitleChange}
        className="form-input"
        type="text"
        name="title"
        placeholder="Title"
        defaultValue={status === 'edit' ? defaultValue : ''}
        maxLength="50"
        required
      />
    </div>
  );
};

export default ExpenseTitleInput;
