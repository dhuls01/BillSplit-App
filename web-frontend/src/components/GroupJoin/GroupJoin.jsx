import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { joinGroup } from '../../api/groups';

const GroupJoin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { groupId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const { success } = await joinGroup(groupId);
      setIsLoading(false);
      if (success) {
        navigate(`/groups/${groupId}`, { replace: true });
      } else {
        navigate(`/groups`);
      }
    };
    getData();
  }, [groupId]);

  return (
    <div className="group-join">
      {isLoading && (
        <div className="spinner">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      )}
    </div>
  );
};

export default GroupJoin;
