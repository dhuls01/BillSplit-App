import React from 'react';
import { GROUP_CATEGORIES } from '../../utils/consts';
import Select from 'react-select';

const GroupCategoryInput = ({ handleCategoryChange, defaultValue, status }) => {
  // Get categories
  const options = GROUP_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));

  const isDefaultCategory = (option) => {
    if (status === 'create') {
      return option.value === '';
    } else {
      return option.value === defaultValue;
    }
  };

  return (
    <div className="form-label-input">
      <Select
        closeMenuOnSelect={true}
        onChange={handleCategoryChange}
        options={options}
        placeholder={'Category'}
        defaultValue={options.find(isDefaultCategory)}
      />
    </div>
  );
};

export default GroupCategoryInput;
