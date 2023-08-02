import { useState, createContext } from 'react';

import Menu from './pages/menu/Menu.jsx';
import ListOfList from './pages/listOfList/ListOfList.jsx';
import Burger from './components/Burger.jsx';
import Settings from './pages/setting/Settings.jsx';
import StrokeElement from './components/StrokeElement.jsx';
import DnD from './Card.jsx';

import data from '../public/data/data.json';
import './App.css';
//create context
export const ScreenContext = createContext();

function App() {
  const listOfListKeys = Object.keys(data.listOfList);
  const orders = Object.values(data.listOfList).map((list) => list.order);
  const [screen, setScreen] = useState('Menu');
  const [isSettings, setSettings] = useState(false);
  const [cardList, setCardList] = useState();

  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  function dragStarHandler(e, card) {}
  function dragLeaveHandler(e) {}
  function dragEndHandler(e) {}
  function dragOverHandler(e) {}
  function dragDropHandler(e, card) {}
  console.log(`current screen: ${screen}`);
  // console.log(orders);
  return (
    // Оберните компонент App в провайдер контекста, чтобы значения были доступны всем компонентам внутри него
    <ScreenContext.Provider value={[screen, changeScreen]}>
      <Burger onClick={() => setSettings(!isSettings)} />

      {/*? padding for all element into the pages */}

      <div className='container'>
        {/* <Menu /> 

        {/* <Session />screen */}
        <ListOfList />

        {/* <Settings /> */}
        {/*Multy elements*/}
        {/* {listOfListKeys.map((key, index) => (
          <StrokeElement
            onDragStart={(e) => dragStarHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, card)}
            draggable={true}
            key={key} // Используем ключ в качестве уникального идентификатора (id)
            id={key} // Прокидываем ключ как id для StrokeElement
            textH1={key}
            textH2={'word count'}
            countH2={231}
            textH3={'game count'}
            countH3={126}
            line={index != listOfListKeys.length - 1 ? true : false}
            isButtonDrag={false}
          />
        ))} */}
      </div>
    </ScreenContext.Provider>
  );
}

export default App;
