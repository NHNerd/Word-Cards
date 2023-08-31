import React from 'react';

import { useContext } from 'react';

import './Burger.css';

import { AppContext } from '../App';

function Burger() {
  const { screen, changeScreen } = useContext(AppContext);

  function test() {
    changeScreen('Menu');
    console.log(test);
  }
  return (
    <>
      <div onClick={test} className='burger'>
        <div className={`burger-line ${screen}`}></div>
      </div>
    </>
  );
}

//TODO memo is don't work. Why?
export default React.memo(Burger);
