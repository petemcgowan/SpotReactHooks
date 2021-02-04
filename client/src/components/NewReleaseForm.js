import React, { useContext, useState } from 'react';
import { ReleaseContext } from '../contexts/ReleaseContext';

const NewReleaseForm = () => {
    // 'dispatchReleases' here means addRelease (now in the reducer)
  const { dispatchReleases } = useContext(ReleaseContext);
  const [artists, setArtists] = useState('');
  const [releaseName, setReleaseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchReleases({ type: 'ADD_DUMMY_RELEASE', release: { artists, releaseName }});
    setArtists('');
    setReleaseName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="artists" value={artists}
        onChange={(e) => setArtists(e.target.value)} required />
      <input type="text" placeholder="release name" value={releaseName}
        onChange={(e) => setReleaseName(e.target.value)} required />
      <input type="submit" value="add release" />
    </form>
  );
}

export default NewReleaseForm;
