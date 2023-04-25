import React, { useContext } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import './GroupReimbursementsItem.css';
import { createExpense } from '../../api/expenses';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/auth.context';

const GroupReimbursementsItem = ({
  reimbursement,
  currency,
  setPageStatus,
}) => {
  const { groupId } = useParams();
  const { user } = useContext(AuthContext);

  const handelPaidBtn = async (e) => {
    e.preventDefault();
    const body = {
      title: 'Reimbursement',
      expense_amount: reimbursement.owed_amount,
      paid_by: reimbursement.user._id,
      category: 'Other',
      shares: [
        {
          shared_with: reimbursement.owes_to._id,
          share_amount: reimbursement.owed_amount,
        },
      ],
      date: new Date(),
    };
    const { success, errorMessage } = await createExpense(groupId, body);
    if (!success) {
      toast.error(errorMessage);
    } else {
      setPageStatus('expenses');
    }
  };

  return (
    <div className="group-reimbursements-item">
      <div>
        <h4>{reimbursement.user.firstName}</h4>
        <p>owes</p>
        <h4>{reimbursement.owes_to.firstName}</h4>
      </div>
      <div className="testt">
        <h3>
          {getSymbolFromCurrency(currency)}
          {Math.abs(reimbursement.owed_amount)}
        </h3>

        {(user._id === reimbursement.user._id.toString() ||
          user._id === reimbursement.owes_to._id.toString()) && (
          <button onClick={handelPaidBtn} className="btn" type="button">
            Mark as paid
          </button>
        )}
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupReimbursementsItem;
