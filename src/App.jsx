import { useState, useEffect, createContext, useRef } from 'react';

import Offline from './pages/offline/Offline.jsx';
import MemoizedNoConnect from './pages/notConnect/NoConnect.jsx';
import Loading from './components/Loading.jsx';
import PlayCard from './components/PlayCard.jsx';
import ListOfList from './pages/listOfList/ListOfList.jsx';
import MemoizedListOfList from './pages/listEditing/ListEditing.jsx';
import Settings from './pages/settings/Settings.jsx';
import Burger from './components/Burger.jsx';
import Fork from './components/Fork/Fork.jsx';
import Statistic from './components/Statistic.jsx';
import { increase, decrease } from './handlers/listOrderHandler.js';
// import { refreshFetch } from './data/auth.js';
import { listsFetch } from './data/content-management.js';
import arrayEqual from './handlers/arrayEqual.js';
// import Auth from './pages/auth/auth.jsx';

import Draggable from './handlers/Draggable/Draggable.jsx';

import './App.css';
//create context

export const AppContext = createContext();

export function App() {
  console.log('App rerenders');
  // get lists from mongoBD

  // increase();
  // LOLData();

  const containerRef = useRef();

  //Check loading
  const [isOnline, setIsOnline] = useState(true);
  const [isConnect, SetIsConnect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //TODO INPROGRESS
  // Check user auth & active
  const [isAuth, setIsAuth] = useState(false);
  const [userActive, setUserActive] = useState(false);

  //user data
  // I get data from localStorage
  // After I get data from mongoDB(if localStorage != mongoDB)
  const oldLists = JSON.parse(localStorage.getItem('lists'));
  const [lists, setLists] = useState(
    oldLists || [{ id: 0, listName: 'Froots', order: '1', gameCount: '0' }]
  );
  // const [lists, setLists] = useState([]);
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
  const [screenFromTo, setScreenFromTo] = useState('Menu>>>Menu');

  const [isSettings, setSettings] = useState(false);

  //TODO Get data inprogress...

  useEffect(() => {
    if (navigator.onLine) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
      return;
    }

    listsFetch()
      .then((data) => {
        SetIsConnect(true);
        setIsAuth(true);
        console.log('isConnect = true');

        if (arrayEqual(oldLists, data, 'listName')) {
          setLists(data);

          //* Local Storage
          //* Changing in the listOfLIst.jsx only! useEffect(list)
        }
      })
      .catch(() => {
        SetIsConnect(false);
        setIsAuth(false);

        console.log('isConnect = false');
      });

    if (!isConnect) {
      return;
    }

    // listner change screen size
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

  //TODO S O R T

  //? screen use in context and changes in childe components
  const changeScreen = (newScreen) => {
    setScreen(newScreen);
  };

  const prevScreenRef = useRef(screen);

  useEffect(() => {
    // get prev
    const prevScreen = prevScreenRef.current;
    setScreenFromTo(prevScreen + '>>>' + screen);
    // Refresh
    prevScreenRef.current = screen;
  }, [screen]);

  //TODO INPROGRESS before need add pages, and aftere add loading in time between pages changed
  if (isLoading) {
    return <Loading />;
  }
  if (!isOnline) {
    return <Offline />;
  }

  return (
    // Оберните компонент App в провайдер контекста, чтобы значения были доступны всем компонентам внутри него
    <AppContext.Provider
      //? order not wise in {} instead []
      value={{
        isConnect,
        SetIsConnect,
        screen,
        changeScreen,
        screenFromTo,
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
        setIsLoading,
        isAuth,
        setIsAuth,
        lists,
        setLists,
      }}
    >
      {isConnect ? (
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
            <ListOfList
              setStrokeElementHeight={setStrokeElementHeight}
              lists={lists}
              setLists={setLists}
              LOLOrder={LOLOrder}
              oldLists={oldLists}
              screen={screen}
            />
          </Draggable>

          <MemoizedListOfList
            setStrokeElementHeight={setStrokeElementHeight}
            lists={lists}
            setLists={setLists}
            LOLOrder={LOLOrder}
            oldLists={oldLists}
            screen={screen}
            changeScreen={changeScreen}
            screenFromTo={screenFromTo}
          />
        </section>
      ) : null}

      {isConnect ? (
        <Burger setSettingOpen={setSettingOpen} />
      ) : (
        <MemoizedNoConnect SetIsConnect={SetIsConnect} setIsAuth={setIsAuth} />
      )}
    </AppContext.Provider>
  );
}
