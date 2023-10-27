import React from 'react';
import Button from '../../components/Button.jsx';
import { listsFetch } from '../../data/content-management.js';
import arrayEqual from '../../handlers/arrayEqual.js';

import './NoConnect.css';

function NoConnect({ SetIsConnect, setIsAuth }) {
  const oldLists = JSON.parse(localStorage.getItem('lists'));

  function connectHandler() {
    listsFetch()
      .then((data) => {
        SetIsConnect(true);
        setIsAuth(true);
        console.log('isConnect = true');
      })
      .catch((error) => {
        // no connect handler
        if (error.message == 'Failed to fetch') {
          SetIsConnect(false);
          console.log('isConnect = false');
        }

        setIsAuth(false);
      });
  }

  return (
    <>
      <div id='no-connection-bg'>
        <div id='wifi'></div>
        <div id='noConnection-text'>server is not available :(</div>
        <div id='noConnection-button-container'>
          <Button
            text={'connect'}
            ButtonOnClickHandler={connectHandler}
            type={`connect`}
            position='center'
            parrentType={'NoConnnection'}
          />
        </div>{' '}
      </div>
    </>
  );
}

const MemoizedNoConnect = React.memo(NoConnect);
export default MemoizedNoConnect;
