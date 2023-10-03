import { useState, useEffect, createContext, useRef } from 'react';

import PlayCard from './components/PlayCard.jsx';
import ListOfList from './pages/listOfList/ListOfList.jsx';
import Settings from './pages/settings/Settings.jsx';
import Burger from './components/Burger.jsx';
import Fork from './components/Fork/Fork.jsx';
import Statistic from './components/Statistic.jsx';
import { increase, decrease } from './handlers/LOLData.js';
// import Auth from './pages/auth/auth.jsx';

import Draggable from './handlers/Draggable/Draggable.jsx';

import './App.css';
//create context

export const AppContext = createContext();

function App() {
  // increase();
  // LOLData();
  const containerRef = useRef();

  const [containerSize, setContainerSize] = useState({ x: 800, y: 800 });
  const [strokeElemenHeight, setStrokeElementHeight] = useState();
  const [menuLOLTransition, setMenuLOLTransition] = useState(0);
  const [LOLOrder, setLOLOrder] = useState(0);
  // Settings
  const [settingOpen, setSettingOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  // Auth
  const [authOpen, setAuthOpen] = useState(false);

  // All
  const [screen, setScreen] = useState('Menu');
  const [isSettings, setSettings] = useState(false);

  //? screen use in context and changes in childe components
  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  // console.log(`current screen: ${screen}`);

  // listner change screen size
  useEffect(() => {
    function updateSizes() {
      // Check is rendered strokeElementRef

      // Geting elements height and setup in state

      setContainerSize({ x: containerRef.current.clientWidth, y: containerRef.current.clientHeight });
      // setStrokeElementHeight(strokeElementRef.current.clientHeight);
      // setForkHeight(forkRef.current.clientHeight);
    }

    updateSizes();

    // Добавляем слушатель события resize на window
    window.addEventListener('resize', updateSizes);
    // Удаляем слушатель события при размонтировании компонента
    return () => {
      window.removeEventListener('resize', updateSizes);
    };
  }, []);

  return (
    // Оберните компонент App в провайдер контекста, чтобы значения были доступны всем компонентам внутри него
    <AppContext.Provider
      //? order not wise in {} instead []
      value={{
        screen,
        changeScreen,
        containerSize,
        strokeElemenHeight,
        menuLOLTransition,
        LOLOrder,
        settingOpen,
        setIsContactsOpen,
        setIsDonateOpen,
        isContactsOpen,
        isDonateOpen,
        authOpen,
        setAuthOpen,
      }}
    >
      <section
        className='container'
        ref={containerRef}
        style={{ '--menuLOLTransition': menuLOLTransition }}
      >
        <Settings setStrokeElementHeight={setStrokeElementHeight} setSettingOpen={setSettingOpen} />
        <Statistic />
        <PlayCard settingOpen={settingOpen} />
        <Fork />

        <Draggable setMenuLOLTransition={setMenuLOLTransition} setLOLOrder={setLOLOrder}>
          <ListOfList setStrokeElementHeight={setStrokeElementHeight} />
        </Draggable>

        {/*Multy elements*/}
      </section>

      <Burger />
    </AppContext.Provider>
  );
}

export default App;
