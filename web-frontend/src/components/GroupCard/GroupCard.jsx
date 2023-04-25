import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { restoreGroup } from '../../api/groups';
import './GroupCard.css';

const GroupCard = ({ groupId, title, category, isArchived }) => {
  const navigate = useNavigate();

  const handleGroupCardClick = async () => {
    if (!isArchived) {
      navigate(`/groups/${groupId}`);
    } else {
      if (window.confirm('Do you want to restore this group ?')) {
        const { success, errorMessage } = await restoreGroup(groupId);
        if (!success) {
          toast.error(errorMessage);
        } else {
          navigate(`/groups/${groupId}`);
        }
      }
    }
  };
  return (
    <div className="group-card" onClick={handleGroupCardClick}>
      <h3>{title}</h3>
      <p>{category}</p>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupCard;
