import { useState } from 'react';
import MenuMain from './pages/menu/MenuMain.jsx';
import MenuFooter from './pages/menu/MenuFooter.jsx';
import SessionHeader from './pages/session/SessionHeader.jsx';
import Burger from './components/Burger.jsx';

import './App.css';

function App() {
  const [screen, setScreen] = useState('Menu');

  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  // function changeClass() {
  //   setHeader('session');
  // }

  let contentHeader = null;
  let contentMain = null;
  let contentFooter = null;

  if (screen === 'Menu') {
    contentHeader = 'Graph';
    contentMain = <MenuMain changeScreen={changeScreen} />;
    contentFooter = <MenuFooter />;
  } else if (screen === 'Session') {
    contentHeader = <SessionHeader changeScreen={changeScreen} />;
    contentMain = <MenuMain changeScreen={changeScreen} />;
    contentFooter = 'Game buttons';
  }

  return (
    <>
      <div className='container'>
        <div className={`header header${screen}`}>
          {' '}
          <Burger />
          {contentHeader}
        </div>
        <div className={`main main${screen}`}>{contentMain}</div>
        <div className={`footer footer${screen}`}>{contentFooter}</div>
      </div>
    </>
  );
}

export default App;
