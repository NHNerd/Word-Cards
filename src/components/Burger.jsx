import React from 'react';

import { useContext } from 'react';

import './Burger.css';

import { AppContext } from '../App';

console.log('B U R G E R');

function Burger({ setSettingOpen }) {
  const { screen, changeScreen, settingOpen } = useContext(AppContext);

  function test() {
    changeScreen('Menu');
    console.log('Burger onClick');
    setSettingOpen(!settingOpen);
  }
  return (
    <>
      <div onClick={test} id='burger'>
        <div className={`burger-line ${screen}`}></div>
      </div>
    </>
  );
}

const MemoizedBurger = React.memo(Burger);
export default MemoizedBurger;
