import React from 'react';
import GroupReimbursementsItem from '../GroupReimbursementsItem/GroupReimbursementsItem';
import './GroupReimbursementsList.css';

const GroupReimbursementsList = ({
  reimbursements,
  currency,
  setPageStatus,
}) => {
  return (
    <div className="group-reimbursements-list">
      {reimbursements.map((reimbursement, index) => (
        <GroupReimbursementsItem
          key={index}
          index={index}
          reimbursement={reimbursement}
          currency={currency}
          setPageStatus={setPageStatus}
        />
      ))}
    </div>
  );
};

export default GroupReimbursementsList;
