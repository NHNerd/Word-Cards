import React from 'react';

import './Burger.css';

import { AppContext } from '../App';

function Burger({ setSettingOpen }) {
  const { screen, changeScreen, setAuthOpen, settingOpen } = React.useContext(AppContext);

  function burgerHandler() {
    if (screen === 'Menu') {
      setSettingOpen(!settingOpen);
      setAuthOpen(false);
    } else {
      changeScreen('Menu');
    }
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
