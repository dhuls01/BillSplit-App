import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupById } from '../../api/groups';
import ExpenseForm from '../../components/ExpenseForm/ExpenseForm';
import ExpensesList from '../../components/ExpensesList/ExpensesList';
import GroupBalances from '../../components/GroupBalances/GroupBalances';
import GroupForm from '../../components/GroupForm/GroupForm';
import GroupHeader from '../../components/GroupHeader/GroupHeader';
import GroupMembersForm from '../../components/GroupMembersForm/GroupMembersForm';
import './GroupByIdPage.css';

const GroupByIdPage = () => {
  const { groupId } = useParams();
  const [group, setGroup] = useState(undefined);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState('expenses');

  const handleCreateExpenseBtn = () => {
    setPageStatus('expenseForm');
  };

  // Get group data
  useEffect(() => {
    const getGroupData = async () => {
      const { success, group, errorMessage } = await getGroupById(groupId);
      setIsLoading(false);
      if (success) {
        setGroup(group);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getGroupData();
  }, [groupId, pageStatus]);

  return (
    <div className="group-by-id-page">
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

      {group && (
        <>
          {(pageStatus === 'expenses' || pageStatus === 'balances') && (
            <GroupHeader
              group={group}
              pageStatus={pageStatus}
              setPageStatus={setPageStatus}
            />
          )}

          {pageStatus === 'members' && (
            <GroupMembersForm
              defaultMembers={group?.members}
              setPageStatus={setPageStatus}
              pageStatus={pageStatus}
            />
          )}

          {pageStatus === 'expenses' && (
            <>
              <ExpensesList
                groupId={groupId}
                currency={group?.currency}
                setErrorMessage={setErrorMessage}
              />
              <button
                type="button"
                onClick={handleCreateExpenseBtn}
                className="create-btn create-expense"
              >
                <i className="fa-solid fa-circle-plus fa-4x"></i>
              </button>
            </>
          )}

          {pageStatus === 'balances' && (
            <GroupBalances
              currency={group?.currency}
              setPageStatus={setPageStatus}
              setErrorMessage={setErrorMessage}
            />
          )}

          {pageStatus === 'groupForm' && (
            <GroupForm
              status={'edit'}
              setPageStatus={setPageStatus}
              group={group}
            />
          )}

          {pageStatus === 'expenseForm' && (
            <ExpenseForm
              group={group}
              status={'create'}
              setPageStatus={setPageStatus}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupByIdPage;
