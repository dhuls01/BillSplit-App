import React from 'react';
import './GroupTitleInput.css';

const GroupTitleInput = ({ title, handleTitleChange }) => {
  return (
    <div className="form-label-input">
      <input
        className="form-input"
        type="text"
        name="title"
        value={title}
        onChange={handleTitleChange}
        maxLength="50"
        placeholder="Title"
        required
      />
    </div>
  );
};

export default GroupTitleInput;
