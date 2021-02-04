import React, { useContext } from 'react';
import { ReleaseContext } from '../contexts/ReleaseContext';

const Navbar = () => {
  const { releases } = useContext(ReleaseContext);
  return (
    <div className="navbar">
      <h1>New Music Releases</h1>
      <p>Currently you have {releases.length} excited puppies awaiting you...</p>
    </div>
  );
}

export default Navbar;
