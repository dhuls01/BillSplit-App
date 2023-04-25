import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { updateGroup } from '../../api/groups';
import { getUserInfo } from '../../api/userInfo';
import toast, { Toaster } from 'react-hot-toast';
import './GroupMembersForm.css';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

const GroupMembersForm = ({ setPageStatus, defaultMembers }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const [friends, setFriends] = useState([]);
  const [isSelected, setIsSelected] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [members, setMembers] = useState([]);
  const [addNewContact, setAddNewContact] = useState(false);

  const { groupId } = useParams();

  const [addedMembers, setAddedMembers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Get user info
  useEffect(() => {
    const getUserData = async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserInfo(userInfo);
        setFriends(userInfo?.friends);
      }
    };
    getUserData();
  }, []);

  // Initialize selected friends
  useEffect(() => {
    if (friends.length) {
      const isSelected = friends.map((friend) => {
        const index = defaultMembers.findIndex(
          (member) => member.email === friend.email
        );
        return index === -1 ? false : true;
      });

      // setIsSelected(new Array(friends.length).fill(false));
      setIsSelected(isSelected);
    }
  }, [friends.length, defaultMembers, friends]);

  useEffect(() => {
    const selectedFriends = [];
    for (let [index, selectedMember] of isSelected.entries()) {
      if (selectedMember) {
        selectedFriends.push(friends[index]);
      }
    }
    setSelectedFriends(selectedFriends);
  }, [isSelected, friends]);

  useEffect(() => {
    const members = [...selectedFriends, ...addedMembers];
    setMembers(members);
  }, [selectedFriends, addedMembers]);

  const handleIsSelected = (index, e) => {
    setIsSelected((prev) => {
      const tmp = [...prev];
      tmp[index] = !isSelected[index];
      return tmp;
    });
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    const isPresent = addedMembers.filter((addedMember) => {
      return addedMember.email === email;
    });

    if (isPresent.length === 0) {
      setAddedMembers((prev) => {
        return [
          ...prev,
          {
            _id: undefined,
            firstName: capitalizeFirstLetter(firstName.trim()),
            lastName: capitalizeFirstLetter(lastName.trim()),
            email: email.trim(),
          },
        ];
      });
    }
    setEmail('');
    setFirstName('');
    setLastName('');
    setAddNewContact(false);
  };

  const handleDeleteMember = (email, e) => {
    e.preventDefault();

    const index = friends.findIndex((member) => {
      return member.email === email;
    });

    if (index === -1) {
      setAddedMembers((prev) => {
        const tmp = [...prev];
        return tmp.filter((member) => member.email !== email);
      });
    } else {
      setIsSelected((prev) => {
        const tmp = [...prev];
        tmp[index] = false;
        return tmp;
      });
    }
  };

  const handleCancelBtn = () => {
    if (defaultMembers.length === 1) {
      setPageStatus('expenses');
    } else {
      setPageStatus('groupForm');
    }
  };

  const handleSubmitMembers = async (e) => {
    e.preventDefault();
    const { success, errorMessage } = await updateGroup(groupId, {
      members: members,
    });

    if (!success) {
      toast.error(errorMessage);
    } else {
      setPageStatus('expenses');
    }
  };

  const handleAddNewContact = () => {
    setAddNewContact((prev) => !prev);
  };

  return (
    <div className="group-members-form">
      {userInfo && (
        <>
          <div className="group-members-form-header">
            <h1>Group members</h1>
            <button
              onClick={handleCancelBtn}
              type="button"
              className="icon-btn"
            >
              <i className="fa-solid fa-xmark fa-2x"></i>
            </button>
          </div>

          <div className="selected-members">
            {members &&
              members?.map((member, index) => (
                <div className="selected-members-item" key={index}>
                  <div className="selected-members-item-circle">
                    <div>
                      <span>{member.firstName.slice(0, 1)}</span>{' '}
                      <span>{member.lastName.slice(0, 1)}</span>{' '}
                      <button
                        onClick={(e) => handleDeleteMember(member.email, e)}
                        className="icon-btn delete-member-btn"
                        type="button"
                      >
                        <span className="fa fa-stack fa-1x">
                          <i className="fa fa-solid fa-circle fa-stack-2x"></i>
                          <i className="fa fa-solid fa-xmark fa-stack-1x fa-inverse"></i>
                        </span>
                      </button>
                    </div>
                  </div>
                  <span>{member.firstName}</span>
                </div>
              ))}
          </div>

          <div className="add-new-contact-btn">
            <button onClick={handleAddNewContact} className="icon-btn">
              <i className="fa-solid fa-user-plus fa-2x"></i>
            </button>
            <span>Add a new contact</span>
          </div>

          {addNewContact && (
            <div>
              <form onSubmit={handleAddMember} className="add-members-form">
                <input
                  className="form-input"
                  type="text"
                  placeholder="First Name"
                  onChange={handleFirstName}
                  value={firstName}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Last Name"
                  onChange={handleLastName}
                  value={lastName}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Email"
                  onChange={handleEmail}
                  value={email}
                  required
                />
                <button className="btn add-members-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
          )}

          <div>
            <h4 className="friends-header">Friends on SplitEasy</h4>
            <form className="friends-list-form" onSubmit={handleSubmitMembers}>
              {friends &&
                friends.map((friend, index) => (
                  <div className="friends-item" key={friend._id}>
                    <p>{friend.firstName}</p>
                    <input
                      type={'checkbox'}
                      checked={isSelected[index] || false}
                      onChange={(e) => handleIsSelected(index, e)}
                      className="checkbox-round"
                    />
                  </div>
                ))}
              <button className="btn save-btn" type="submit">
                Save
              </button>
            </form>
          </div>
        </>
      )}
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default GroupMembersForm;
