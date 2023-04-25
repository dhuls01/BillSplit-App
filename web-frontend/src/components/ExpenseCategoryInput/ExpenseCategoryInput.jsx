import React from 'react';
import { EXPENSE_CATEGORIES } from '../../utils/consts';
import Select from 'react-select';

const ExpenseCategoryInput = ({
  handleCategoryChange,
  defaultValue,
  status,
}) => {
  // Get categories
  const options = EXPENSE_CATEGORIES.map((category) => ({
    value: category,
    label: category,
  }));

  function isDefaultCategory(option) {
    if (status === 'create') {
      return option.value === '';
    } else {
      return option.value === defaultValue;
    }
  }

  return (
    <div className="form-label-input">
      <Select
        closeMenuOnSelect={true}
        onChange={handleCategoryChange}
        options={options}
        defaultValue={options.find(isDefaultCategory)}
        placeholder="Category"
      />
    </div>
  );
};

export default ExpenseCategoryInput;
