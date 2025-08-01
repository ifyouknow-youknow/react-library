import './App.css';
import React from 'react'
import { Clickable } from './UTILITIES/Clickable';
import { db, firebase_GetAllDocumentsQueriedOrderedLimitedDistancedPaginated } from './firebase';
import { searchAlgolia } from './FUNCTIONS/algolia';

function App() {
  return (
    <div className="main">
      <h1 className='roboto'>NOTHING BAGEL</h1>
      {/*  */}

      <Clickable onPress={async () => {
        const hits = await searchAlgolia('NEH55XXESD', '86558918b58352b53ef366cce28b9494', 'KeepMe', 'Blocks', {});
        console.log(hits)
      }}>
        <p>Press Me</p>
      </Clickable>
    </div>
  );
}

export default App;
