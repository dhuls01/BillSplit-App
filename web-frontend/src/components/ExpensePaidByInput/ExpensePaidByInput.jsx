import React, { useContext } from 'react';
import Select from 'react-select';
import { AuthContext } from '../../context/auth.context';

const ExpensePaidByInput = ({
  handlePaidByChange,
  members,
  status,
  defaultValue,
}) => {
  const { user } = useContext(AuthContext);

  const options = members.map((member) => ({
    label: member.firstName,
    value: member._id,
  }));

  function isDefaultTitle(option) {
    if (status === 'create') {
      return option.value === user._id;
    } else {
      return option.value === defaultValue._id;
    }
  }

  return (
    <div className="form-label-input">
      <Select
        closeMenuOnSelect={true}
        onChange={handlePaidByChange}
        options={options}
        defaultValue={options.find(isDefaultTitle)}
        placeholder="Paid by"
      />
    </div>
  );
};

export default ExpensePaidByInput;
