import React from 'react';
import './GroupHeader.css';
import toast, { Toaster } from 'react-hot-toast';

const GroupHeader = ({ group, pageStatus, setPageStatus }) => {
  // Handle edit button
  const handleEditBtn = () => {
    setPageStatus('groupForm');
  };

  const handleExpBalChange = (e) => {
    e.preventDefault();
    switch (e.target.textContent) {
      case 'Expenses':
        setPageStatus('expenses');
        break;
      case 'Balances':
        setPageStatus('balances');
        break;
      default:
        setPageStatus('expenses');
        break;
    }
  };

  const handleShareBtn = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(group?.joinLink);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="group-header">
      <div className="title-edit">
        <h1 className="group-title">{group?.title} </h1>
        <button onClick={handleEditBtn} className="icon-btn">
          <i className="fa-solid fa-pen-to-square fa-2x"></i>
        </button>
      </div>

      <ul className="group-header-members">
        {group?.members.map((member, index) => (
          <li key={index}>
            {member.firstName}
            {member._id.toString() === group?.owner._id.toString() && (
              <span style={{ fontWeight: 'normal' }}> (owner)</span>
            )}
          </li>
        ))}
      </ul>

      {group?.members.length === 1 && (
        <div className="share-add-members">
          <p>Looks like you are the only one here</p>
          <div className="group-header-btns">
            <button onClick={handleShareBtn} className="btn share-btn">
              <i className="fa-solid fa-share-from-square"></i>
              Share
            </button>
            <button
              onClick={() => setPageStatus('members')}
              type="button"
              className="btn share-btn"
            >
              Add Members
            </button>
          </div>
        </div>
      )}

      <div className="nav">
        <div
          onClick={handleExpBalChange}
          className={pageStatus === 'expenses' ? 'view-selected' : ''}
        >
          Expenses
        </div>
        <div
          onClick={handleExpBalChange}
          className={pageStatus === 'balances' ? 'view-selected' : ''}
        >
          Balances
        </div>
      </div>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupHeader;
