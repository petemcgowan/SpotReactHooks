import React, { createContext, useReducer, useEffect } from 'react';
import { ReleaseReducer } from '../reducers/ReleaseReducer';

export const ReleaseContext = createContext();


const ReleaseContextProvider = (props) => {

  const [releases, dispatchReleases] = useReducer(ReleaseReducer, [], async () => {
    const localData = localStorage.getItem('releases');

    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('releases', JSON.stringify(releases));
  }, [releases]);
  return (
    <ReleaseContext.Provider value={{ releases, dispatchReleases }}>
      {props.children}
    </ReleaseContext.Provider>
  );
}


export default ReleaseContextProvider;
