import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './ExpenseHeader.css';

const ExpenseHeader = ({ expense, setPageStatus }) => {
  // Handle edit button
  const handleEditBtn = () => {
    setPageStatus('expenseForm');
  };

  return (
    <div className="expense-header">
      {expense && (
        <>
          <div className="full-width">
            <h1 className="expense-header-title">{expense?.title}</h1>
            <button onClick={handleEditBtn} className="icon-btn">
              <i className="fa-solid fa-pen-to-square fa-2x"></i>
            </button>
          </div>
          <h2 className="expense-header-amount">
            <span>{getSymbolFromCurrency(expense?.group.currency)}</span>
            {expense?.expense_amount}
          </h2>
          <div className="full-width">
            <p>
              <span>Paid by {expense?.paid_by.firstName} </span>
              on
              <span> {new Date(expense?.date).toLocaleDateString('fr')}</span>
            </p>
            <p>{expense?.category}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpenseHeader;
