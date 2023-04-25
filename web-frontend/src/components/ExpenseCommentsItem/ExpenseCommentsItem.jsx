import React, { useContext } from 'react';
import './ExpenseCommentItem.css';
import { AuthContext } from '../../context/auth.context';
import { deleteComment } from '../../api/comments';
import toast, { Toaster } from 'react-hot-toast';

const ExpenseCommentsItem = ({ comment, groupId, expenseId, setComments }) => {
  const { user } = useContext(AuthContext);

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    const { success, deletedComment, errorMessage } = await deleteComment(
      groupId,
      expenseId,
      comment._id
    );
    if (!success) {
      toast.error(errorMessage);
    } else {
      setComments((currentComments) => {
        return currentComments.filter(
          (comment) => comment._id !== deletedComment._id
        );
      });
    }
  };

  return (
    <div className="expense-comment-item">
      <div
        className={`initials ${
          user._id === comment?.user._id ? 'user-initials' : ''
        }`}
      >
        <span>{comment?.user.firstName.slice(0, 1)}</span>{' '}
        <span>{comment?.user.lastName.slice(0, 1)}</span>{' '}
      </div>
      <div className="comment-message">
        <p className="comment-message">{comment?.message}</p>
      </div>
      <p className="comment-date">
        {new Date(comment?.date).toLocaleDateString('fr')}
      </p>
      <button onClick={handleDeleteComment} className="icon-btn" type="button">
        <i className="fa-solid fa-trash"></i>
      </button>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default ExpenseCommentsItem;
