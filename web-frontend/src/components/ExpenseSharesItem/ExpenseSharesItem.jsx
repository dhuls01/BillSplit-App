import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './ExpenseSharesItem.css';

const ExpenseSharesItem = ({ share, currency }) => {
  return (
    <div className="expense-shares-item">
      <h4>{share.shared_with.firstName}</h4>
      <h4>
        <span>{getSymbolFromCurrency(currency)}</span>
        {share.share_amount}
      </h4>
    </div>
  );
};

export default ExpenseSharesItem;
