import React, { useContext, useState } from 'react';
import {
  archiveGroup,
  createGroup,
  deleteGroup,
  updateGroup,
} from '../../api/groups';
import GroupCategoryInput from '../GroupCategoryInput/GroupCategoryInput';
import GroupCurrencyInput from '../GroupCurrencyInput/GroupCurrencyInput';
import GroupTitleInput from '../GroupTitleInput/GroupTitleInput';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../context/auth.context';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import './GroupForm.css';
import { useNavigate } from 'react-router-dom';

const GroupForm = ({ status, setPageStatus, group }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState(status === 'edit' ? group?.title : '');
  const [currency, setCurrency] = useState('');
  const [category, setCategory] = useState(
    status === 'edit' ? group?.category : ''
  );

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleCurrencyChange = (e) => {
    setCurrency(e.value);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (status === 'create') {
      const { success, createdGroup, errorMessage } = await createGroup({
        title: capitalizeFirstLetter(title),
        currency,
        category,
      });
      if (!success) {
        toast.error(errorMessage);
      } else {
        navigate(`/groups/${createdGroup._id.toString()}`);
      }
    }
    if (status === 'edit') {
      const { success, errorMessage } = await updateGroup(
        group?._id.toString(),
        { title: capitalizeFirstLetter(title), category }
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        setPageStatus('expenses');
      }
    }
  };

  const handleDeleteBtn = async (e) => {
    e.preventDefault();
    if (window.confirm('Do you want to permanently delete this group ?')) {
      const { success, errorMessage } = await deleteGroup(
        group?._id.toString()
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        navigate('/groups');
      }
    }
  };

  const handleCancelBtn = async (e) => {
    e.preventDefault();
    if (status === 'create') {
      setPageStatus('groups');
    }
    if (status === 'edit') {
      setPageStatus('expenses');
    }
  };

  // Handle archive button
  const handleArchiveBtn = async (e) => {
    e.preventDefault();
    if (window.confirm('Confirm group archiving ?')) {
      const { success, errorMessage } = await archiveGroup(
        group?._id.toString()
      );
      if (!success) {
        toast.error(errorMessage);
      } else {
        navigate('/groups');
      }
    }
  };

  const handleShareBtn = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(group?.joinLink);
    toast.success('Link copied to clipboard');
  };

  return (
    <div className="group-form-container">
      <div className="group-form-header">
        <h1>{status === 'create' ? 'New group' : 'Edit group'}</h1>
        <button onClick={handleCancelBtn} className="icon-btn">
          <i className="fa-solid fa-xmark fa-2x"></i>
        </button>
      </div>

      <form onSubmit={handleFormSubmit} className="group-form">
        <GroupTitleInput title={title} handleTitleChange={handleTitleChange} />
        <GroupCategoryInput
          defaultValue={group?.category}
          handleCategoryChange={handleCategoryChange}
          status={status}
        />

        {status === 'create' && (
          <GroupCurrencyInput
            currency={currency}
            handleCurrencyChange={handleCurrencyChange}
          />
        )}

        {status === 'edit' && (
          <div className="group-form-members">
            <div className="share-add-members">
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
                  Edit members
                </button>
              </div>
            </div>
          </div>
        )}

        <button className="btn save-btn" type="submit">
          Save
        </button>

        {status === 'edit' && (
          <div className="archive-delete-btns">
            <button
              onClick={handleArchiveBtn}
              className="btn archive-btn"
              type="button"
            >
              {'Archive'}
            </button>

            {group?.owner._id === user._id && (
              <button
                onClick={handleDeleteBtn}
                className="btn delete-btn"
                type="button"
              >
                {'Delete'}
              </button>
            )}
          </div>
        )}
      </form>

      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupForm;
