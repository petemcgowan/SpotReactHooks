import React, { createContext, useReducer, useEffect } from 'react';
import { CrateReducer } from '../reducers/CrateReducer';

export const CrateContext = createContext();

// Pete TODO: I'm replacing this, so this should no longer be needed or referenced

const CrateContextProvider = (props) => {

  const [crateItems, dispatchCrate] = useReducer(CrateReducer, [], () => {
    const localData = localStorage.getItem('NLRcrateItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('NLRcrateItems', JSON.stringify(crateItems));
  }, [crateItems]);
  return (
    <CrateContext.Provider value={{ crateItems, dispatchCrate }}>
      {props.children}
    </CrateContext.Provider>
  );
}

export default CrateContextProvider;
