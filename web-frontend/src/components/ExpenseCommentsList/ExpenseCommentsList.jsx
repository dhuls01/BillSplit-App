import React from 'react';
import ExpenseCommentsItem from '../ExpenseCommentsItem/ExpenseCommentsItem';

const ExpenseCommentsList = ({ comments, setComments, groupId, expenseId }) => {
  return (
    <div className="expense-comments-list">
      {comments?.map((comment) => (
        <ExpenseCommentsItem
          key={comment._id}
          comment={comment}
          setComments={setComments}
          groupId={groupId}
          expenseId={expenseId}
        />
      ))}
    </div>
  );
};

export default ExpenseCommentsList;
