import React, { useContext } from 'react';
import ReleaseDetails from './ReleaseDetails';
import { ReleaseContext } from '../contexts/ReleaseContext';

const ReleaseList = () => {
  const { releases } = useContext(ReleaseContext);
  return releases.length ? (
    <div className="release-list">
      <ul>
        {releases.map(release => {
          return ( <ReleaseDetails release={release} key={release.id} /> );
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No releases to ogle.</div>
  );
}

export default ReleaseList;
