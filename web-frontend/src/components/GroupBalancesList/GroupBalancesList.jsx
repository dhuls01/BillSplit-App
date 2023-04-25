import React from 'react';
import GroupBalancesItem from '../GroupBalancesItem/GroupBalancesItem';

const GroupBalancesList = ({ balances, currency }) => {
  return (
    <div className="group-balances-list">
      {balances?.map((balance, index) => (
        <GroupBalancesItem key={index} balance={balance} currency={currency} />
      ))}
    </div>
  );
};

export default GroupBalancesList;
