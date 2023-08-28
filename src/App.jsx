import { useState, useEffect, createContext, useRef } from 'react';

import PlayCard from './components/PlayCard.jsx';
import ListOfList from './pages/listOfList/ListOfList.jsx';
import Burger from './components/Burger.jsx';
import Settings from './pages/setting/Settings.jsx';
import Fork from './components/Fork.jsx';
import Statistic from './components/Statistic.jsx';

import Draggable from './handlers/Draggable/Draggable.jsx';

import data from '../public/data/data.json';
import './App.css';
//create context
//TODO Add conteinerSize in context
export const ScreenContext = createContext();

function App() {
  const containerRef = useRef();

  const [containerSize, setContainerSize] = useState({ x: 800, y: 800 });

  const [strokeElemenHeight, setStrokeElementHeight] = useState();
  const [menuLOLTransition, setMenuLOLTransition] = useState(0);

  const [screenChangeMenuLOL, setScreenChangeMenuLOL] = useState(false);
  const [screen, setScreen] = useState('Menu');
  const [isSettings, setSettings] = useState(false);

  //? screen use in context and changes in childe components
  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  console.log(screen);
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
    <ScreenContext.Provider value={[screen, changeScreen]}>
      <div className='container' ref={containerRef}>
        {/* <Menu /> 

        {/* <Session />screen */}
        <Statistic menuLOLTransition={menuLOLTransition} />
        <PlayCard menuLOLTransition={menuLOLTransition} />
        <Fork containerSize={containerSize} menuLOLTransition={menuLOLTransition} />

        <Draggable
          containerSize={containerSize}
          strokeElemenHeight={strokeElemenHeight}
          menuLOLTransition={menuLOLTransition}
          setMenuLOLTransition={setMenuLOLTransition}
        >
          <ListOfList
            setStrokeElementHeight={setStrokeElementHeight}
            menuLOLTransition={menuLOLTransition}
          />
        </Draggable>

        {/* <Settings /> */}
        {/*Multy elements*/}
      </div>
      {<Burger /*onClick={() => setSettings(!isSettings)}*/ />}
    </ScreenContext.Provider>
  );
}

export default App;
