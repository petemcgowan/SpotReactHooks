import React, { useContext } from 'react';
import { ReleaseContext } from '../contexts/ReleaseContext';
import { RecordCrateContext } from '../contexts/RecordCrateState';
import { getEmail } from '../utils/helpers';

const ReleaseDetails = ({ release }) => {
  // 'dispatchReleases' here means 'removeRelease' function (now in the reducer)
  const { dispatchReleases } = useContext(ReleaseContext);
  const { addRecordCrate } = useContext(RecordCrateContext);

  return (
    <li onClick={ () => {
      console.log("ReleaseDetails, onClick, release:" + JSON.stringify(release))
      dispatchReleases({ type: 'REMOVE_RELEASE', release });
      addRecordCrate(release.artists, release.releaseName, getEmail());
    }}>
      <div className="artists">{release.artists}</div>
      <div className="releaseName">{release.releaseName}</div>
    </li>
  );
}

export default ReleaseDetails;
