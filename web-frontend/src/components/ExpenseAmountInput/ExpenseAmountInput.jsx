import React from 'react';

const ExpenseAmountInput = ({
  handleExpenseAmountChange,
  status,
  defaultValue,
}) => {
  function validateExpenseAmount(e) {
    if (Number(e.target.value) <= 0) {
      e.target.setCustomValidity('Expense amount must be greater than 0');
    } else {
      e.target.setCustomValidity('');
    }
  }

  return (
    <div className="form-label-input">
      <input
        className="form-input"
        type="number"
        min="0"
        step="0.01"
        defaultValue={status === 'create' ? '' : defaultValue}
        onChange={handleExpenseAmountChange}
        onKeyUp={validateExpenseAmount}
        placeholder="Amount"
        required
      />
    </div>
  );
};

export default ExpenseAmountInput;
