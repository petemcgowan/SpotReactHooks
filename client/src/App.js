import React from 'react';


import Navbar from './components/Navbar';

import ReleaseContextProvider from './contexts/ReleaseContext';
import { RecordCrateProvider } from './contexts/RecordCrateState';
import ReleaseList from './components/ReleaseList';
import CrateList from './components/CrateList';

import NewReleaseForm from './components/NewReleaseForm';
import NewCrateItemForm from './components/NewCrateItemForm';
import SearchReleaseForm from './components/SearchReleasesForm';

function App() {


  return (
    <div className="App">
      <RecordCrateProvider>
      <ReleaseContextProvider>
        <Navbar />
        <ReleaseList />
        <SearchReleaseForm/>
        <NewReleaseForm />
        <CrateList />
        <NewCrateItemForm />
      </ReleaseContextProvider>
      </RecordCrateProvider>
    </div>
  );
}

export default App;


