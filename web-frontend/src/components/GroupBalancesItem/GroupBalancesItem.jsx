import React from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './GroupBalancesItem.css';

const GroupBalancesItem = ({ balance, currency }) => {
  let symbol = '';
  let className = 'group-member-balance';
  if (balance.balance > 0) {
    symbol = '+';
    className = 'group-member-balance pos-balance';
  }
  if (balance.balance < 0) {
    symbol = '-';
    className = 'group-member-balance neg-balance';
  }

  return (
    <div className="group-balances-item">
      <h4>{balance.user.firstName}</h4>
      <h4 className={className}>
        <span>{symbol}</span>
        {getSymbolFromCurrency(currency)}
        {Math.abs(balance.balance)}
      </h4>
    </div>
  );
};

export default GroupBalancesItem;
