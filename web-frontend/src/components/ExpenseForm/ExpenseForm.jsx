import React, { useContext, useEffect, useState } from 'react';
import ExpenseAmountInput from '../ExpenseAmountInput/ExpenseAmountInput';
import ExpenseCategoryInput from '../ExpenseCategoryInput/ExpenseCategoryInput';
import ExpenseDateInput from '../ExpenseDateInput/ExpenseDateInput';
import ExpensePaidByInput from '../ExpensePaidByInput/ExpensePaidByInput';
import ExpenseSharesInput from '../SharesInputs/SharesInputs';
import ExpenseTitleInput from '../ExpenseTitleInput/ExpenseTitleInput';
import { validateExpense } from '../../utils/validateExpense';
import toast, { Toaster } from 'react-hot-toast';
import {
  createExpense,
  deleteExpense,
  updateExpense,
} from '../../api/expenses';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = ({ group, expense, status, setPageStatus }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(status === 'edit' ? expense?.title : '');
  const [paid_by, setPaidBy] = useState(user._id);
  const [category, setCategory] = useState(
    status === 'edit' ? expense?.category : ''
  );
  const [expense_amount, setExpenseAmount] = useState(
    status === 'edit' ? expense?.expense_amount : ''
  );
  const [shares, setShares] = useState([]);
  const [date, setDate] = useState(
    status === 'edit' ? new Date(expense?.date) : new Date()
  );

  useEffect(() => {
    const shares = group?.members.map((member) => ({
      shared_with: member._id,
      share_amount: 0,
    }));
    setShares(shares);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePaidByChange = (e) => {
    setPaidBy(e.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.value);
  };

  const handleDateChange = (e) => {
    setDate(e);
  };

  const handleExpenseAmountChange = (e) => {
    const amount = e.target.value;
    if (
      amount.indexOf('.') === -1 ||
      amount.indexOf('.') >= amount.length - 3
    ) {
      setExpenseAmount(Number(amount));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateExpense(expense_amount, shares);
    if (!isValid) {
      return toast.error('Total shares must add up to expense amount');
    } else {
      if (status === 'create') {
        const { success, errorMessage } = await createExpense(
          group._id.toString(),
          {
            title: capitalizeFirstLetter(title),
            paid_by,
            category,
            expense_amount,
            shares: shares.filter((element) => element.share_amount !== 0),
            date,
          }
        );
        if (!success) {
          toast.error(errorMessage);
        } else {
          setPageStatus('expenses');
        }
      }
      if (status === 'edit') {
        const { success, errorMessage } = await updateExpense(
          group._id.toString(),
          expense._id.toString(),
          {
            title: capitalizeFirstLetter(title),
            paid_by,
            category,
            expense_amount,
            shares: shares.filter((element) => element.share_amount !== 0),
            date,
          }
        );
        if (!success) {
          toast.error(errorMessage);
        } else {
          setPageStatus('expense');
        }
      }
    }
  };

  const handleCancelBtn = async (e) => {
    e.preventDefault();
    setPageStatus(status === 'edit' ? 'expense' : 'expenses');
  };

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    if (window.confirm('Confirm expense deletion ?')) {
      const { success, errorMessage } = await deleteExpense(
        group?._id.toString(),
        expense?._id.toString()
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        navigate(`/groups/${group._id.toString()}`);
      }
    }
  };

  return (
    <div className="group-form-container">
      <div className="group-form-header">
        <h1>{status === 'create' ? 'New expense' : 'Edit expense'}</h1>
        <button onClick={handleCancelBtn} className="icon-btn">
          <i className="fa-solid fa-xmark fa-2x"></i>
        </button>
      </div>
      <form onSubmit={handleSubmit} className="group-form">
        <ExpenseTitleInput
          handleTitleChange={handleTitleChange}
          defaultValue={expense?.title}
          status={status}
        />

        <ExpensePaidByInput
          handlePaidByChange={handlePaidByChange}
          members={group?.members}
          defaultValue={expense?.paid_by}
          status={status}
        />

        <ExpenseCategoryInput
          handleCategoryChange={handleCategoryChange}
          defaultValue={expense?.category}
          status={status}
        />

        <ExpenseAmountInput
          handleExpenseAmountChange={handleExpenseAmountChange}
          defaultValue={expense?.expense_amount}
          status={status}
        />

        <ExpenseDateInput
          handleDateChange={handleDateChange}
          date={date}
          status={status}
        />

        <ExpenseSharesInput
          members={group?.members}
          expense_amount={expense_amount}
          setShares={setShares}
          currency={group?.currency}
          shares={shares}
        />
        <div className="form-buttons">
          <button className="btn save-btn" type="submit">
            Save
          </button>

          {status === 'edit' && (
            <button
              onClick={handleDeleteBtn}
              className="btn delete-btn"
              type="button"
            >
              {'Delete'}
            </button>
          )}
        </div>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ExpenseForm;
