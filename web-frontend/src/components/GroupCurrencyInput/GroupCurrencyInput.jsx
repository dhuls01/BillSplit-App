import React from 'react';
import { CURRENCIES } from '../../utils/consts';
import Select from 'react-select';

const GroupCurrencyInput = ({ handleCurrencyChange, status }) => {
  // Get currencies
  const options = CURRENCIES.map((currency) => ({
    value: currency,
    label: currency,
  }));

  return (
    <div className="form-label-input">
      <Select
        closeMenuOnSelect={true}
        onChange={handleCurrencyChange}
        placeholder={'Currency'}
        options={options}
      />
    </div>
  );
};

export default GroupCurrencyInput;
