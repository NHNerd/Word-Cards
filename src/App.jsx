import { useState, createContext } from 'react';

import Menu from './pages/menu/Menu.jsx';
import ListOfList from './pages/listOfList/ListOfList.jsx';
import Burger from './components/Burger.jsx';
import Settings from './pages/setting/Settings.jsx';

import './App.css';
//create context
export const ScreenContext = createContext();

function App() {
  const [screen, setScreen] = useState('Menu');
  const [isSettings, setSettings] = useState(false);

  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  console.log(`current screen: ${screen}`);
  return (
    // Оберните компонент App в провайдер контекста, чтобы значения были доступны всем компонентам внутри него
    <ScreenContext.Provider value={[screen, changeScreen]}>
      <Burger onClick={() => setSettings(!isSettings)} />

      {/*? padding for all element into the pages */}
      <div className='container'>
        <Menu />

        {/* <Session />screen */}
        {/* <ListOfList /> */}
        {/* <Settings /> */}
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
