import React, { useContext, useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import { getUserInfo } from '../../api/userInfo';
import { AuthContext } from '../../context/auth.context';

const GroupMembersInput = ({ handleMembersChange, defaultMembers, status }) => {
  const [userInfo, setUserInfo] = useState(undefined);
  const { user } = useContext(AuthContext);

  const getUserData = async () => {
    const userInfo = await getUserInfo();
    setUserInfo(userInfo);
  };

  // Get user info
  useEffect(() => {
    getUserData();
  }, []);

  // Get users friends
  const options = userInfo?.friends.map((friend) => ({
    label: friend.firstName,
    value: friend.email,
  }));

  const defaultOptions = defaultMembers
    ?.map((member) => ({
      label: member.firstName,
      value: member.email,
    }))
    .filter((member) => {
      return member.value !== user.email;
    });

  return (
    <div className="form-label-input">
      <label className="form-label" htmlFor="members">
        Members
      </label>
      <CreatableSelect
        closeMenuOnSelect={false}
        onChange={handleMembersChange}
        options={options}
        defaultValue={status === 'edit' ? defaultOptions : undefined}
        isMulti
      />
    </div>
  );
};

export default GroupMembersInput;
