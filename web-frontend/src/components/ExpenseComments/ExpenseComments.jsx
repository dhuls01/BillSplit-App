import React, { useEffect, useState } from 'react';
import { createComment, getComments } from '../../api/comments';
import ExpenseCommentsList from '../ExpenseCommentsList/ExpenseCommentsList';
import toast, { Toaster } from 'react-hot-toast';
import './ExpenseComments.css';

const ExpenseComments = ({ groupId, expenseId, setErrorMessage }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { success, comments, errorMessage } = await getComments(
        groupId,
        expenseId
      );
      if (success) {
        setComments(comments);
      } else {
        setErrorMessage(errorMessage);
      }
    };
    getData();
  }, [groupId, expenseId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    e.target.reset();
    const { success, createdComment, errorMessage } = await createComment(
      groupId,
      expenseId,
      {
        message: newComment,
      }
    );
    if (!success) {
      toast.error(errorMessage);
    } else {
      setComments((currentComments) => {
        return [createdComment, ...currentComments];
      });
    }
  };

  return (
    <div className="expense-comments">
      <h2>Comments</h2>
      <form onSubmit={handleCommentSubmit}>
        <div className="add-expense-bar">
          <div className="form-input">
            <input
              className="search-bar"
              type="text"
              onChange={handleCommentChange}
              maxLength="100"
              placeholder="... Add a comment"
            />
            <button className="icon-btn" type="submit">
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </form>
      <ExpenseCommentsList
        comments={comments}
        setComments={setComments}
        groupId={groupId}
        expenseId={expenseId}
      />
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ExpenseComments;
