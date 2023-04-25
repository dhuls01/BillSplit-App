import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getExpenseById } from '../../api/expenses';
import ExpenseHeader from '../../components/ExpenseHeader/ExpenseHeader';
import ExpenseSharesList from '../../components/ExpenseSharesList/ExpenseSharesList';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpenseComments from '../../components/ExpenseComments/ExpenseComments';

const ExpenseByIdPage = () => {
  const { groupId, expenseId } = useParams();
  const [expense, setExpense] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [pageStatus, setPageStatus] = useState('expense');
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    const getData = async () => {
      const { success, expense, errorMessage } = await getExpenseById(
        groupId,
        expenseId
      );
      setIsLoading(false);
      if (success) {
        setExpense(expense);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getData();
  }, [groupId, expenseId, pageStatus]);

  return (
    <div className="expense-by-id-page">
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <h1>{errorMessage}</h1>
        </div>
      )}

      {expense && (
        <>
          {pageStatus === 'expense' && (
            <>
              <ExpenseHeader expense={expense} setPageStatus={setPageStatus} />
              <ExpenseSharesList
                shares={expense?.shares}
                currency={expense?.group.currency}
              />
              <ExpenseComments
                groupId={groupId}
                expenseId={expenseId}
                setErrorMessage={setErrorMessage}
              />
            </>
          )}

          {pageStatus === 'expenseForm' && (
            <ExpenseForm
              group={expense?.group}
              expense={expense}
              status={'edit'}
              setPageStatus={setPageStatus}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExpenseByIdPage;
