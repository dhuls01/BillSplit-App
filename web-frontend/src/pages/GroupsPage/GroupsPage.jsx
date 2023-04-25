import React, { useEffect, useState } from 'react';
import { getGroups } from '../../api/groups';
import GroupCard from '../../components/GroupCard/GroupCard';
import GroupForm from '../../components/GroupForm/GroupForm';
import './GroupsPage.css';

const GroupsPage = () => {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageStatus, setPageStatus] = useState('groups');
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [archivedFilter, setArchivedFilter] = useState(false);
  const [filteredGroups, setFilteredGroups] = useState([]);

  const getGroupsData = async () => {
    const { groups, success, errorMessage } = await getGroups();
    if (success) {
      setGroups(groups);
      setIsLoading(false);
    } else {
      setErrorMessage(errorMessage);
    }
  };

  // Filter groups based on archived status
  useEffect(() => {
    if (groups.length > 0) {
      let filteredGroups = [];
      if (archivedFilter) {
        filteredGroups = groups.filter((group) => {
          return group.isArchived === true;
        });
      } else {
        filteredGroups = groups.filter((group) => {
          return group.isArchived === false;
        });
      }
      setFilteredGroups(filteredGroups);
    }
  }, [groups, archivedFilter, pageStatus]);

  const groupsLeft = (groups?.length || 0) - (filteredGroups?.length || 0);

  // Handle archived filter
  const handleArchivedFilter = () => {
    setArchivedFilter(!archivedFilter);
  };

  // Get groups data
  useEffect(() => {
    getGroupsData();
  }, [pageStatus]);

  // Handle create group button
  const handleCreateBtn = () => {
    setPageStatus('groupForm');
  };

  return (
    <>
      {pageStatus === 'groupForm' && (
        <GroupForm status={'create'} setPageStatus={setPageStatus} />
      )}
      {pageStatus === 'groups' && (
        <section className="groups-page">
          <div className="groups-page-header">
            <h1>My groups</h1>
            <button className="btn btn-filter" onClick={handleArchivedFilter}>
              {archivedFilter
                ? `Active (${groupsLeft})`
                : `Archived (${groupsLeft})`}
            </button>
          </div>

          {isLoading && (
            <div className="spinner">
              <i className="fas fa-spinner fa-spin fa-3x"></i>
            </div>
          )}

          {groups.length > 0 && (
            <div className="groups-list">
              {filteredGroups.map((group) => {
                return (
                  <GroupCard
                    key={group._id}
                    groupId={group._id}
                    title={group.title}
                    category={group.category}
                    isArchived={group.isArchived}
                  />
                );
              })}
            </div>
          )}

          {!isLoading && groups.length === 0 && (
            <div className="no-groups-message">
              <h3>You have no groups yet.</h3>
              <p>Tap the "+" button to create a new group.</p>
              <i className="fa-solid fa-arrow-down-long fa-4x "></i>
            </div>
          )}

          {errorMessage && (
            <div className="error-message">
              <h1>{errorMessage}</h1>
            </div>
          )}

          <button onClick={handleCreateBtn} className="create-btn">
            <i className="fa-solid fa-circle-plus fa-4x"></i>
          </button>
        </section>
      )}
    </>
  );
};

export default GroupsPage;
