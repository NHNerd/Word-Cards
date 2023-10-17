import React from 'react';

import { useContext } from 'react';

import './Burger.css';

import { AppContext } from '../App';

function Burger() {
  const { screen, changeScreen } = useContext(AppContext);

  function burgerHandler() {
    changeScreen('Menu');
    console.log('Burger onClick');
  }
  return (
    <>
      <div onClick={burgerHandler} id='burger'>
        <div className={`burger-line ${screen}`}></div>
      </div>
    </>
  );
}

const MemoizedBurger = React.memo(Burger);
export default MemoizedBurger;
