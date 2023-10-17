import React from 'react';

import './Loading.css';

function Loading() {
  return (
    <>
      <div id='loading'>Loading...</div>
    </>
  );
}

const MemoizedBurger = React.memo(Loading);
export default MemoizedBurger;
