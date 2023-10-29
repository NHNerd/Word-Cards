import React from 'react';

import Auth from '../auth/auth';

import { AppContext } from '../../App.jsx';

import './AuthFirst.css';

function AuthFirst({ setStrokeElementHeight }) {
  const { isAuth } = React.useContext(AppContext);

  return (
    <>
      <section id='container-authFirst' className={!isAuth ? 'on' : null}>
        <Auth setStrokeElementHeight={setStrokeElementHeight} />
      </section>
      <header id='authFirstHeader'></header>
    </>
  );
}

const MemoizedAuthFirst = React.memo(AuthFirst);
export default MemoizedAuthFirst;
