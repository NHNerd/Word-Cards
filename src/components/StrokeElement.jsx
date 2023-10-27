import { useContext, useState, useEffect, useRef } from 'react';
import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';
import { deleteListFetch } from '../data/content-management.js';

import { AppContext } from '../App.jsx';

import './StrokeElement.css';

function StrokeElement({
  setStrokeElementHeight,
  parrentTypeSettings,
  parrentType,
  textH1,
  textH2,
  countH2,
  textH3,
  countH3,
  line,
  isButtonDrag,
  order,
  axis,
  pos,
  children,
}) {
  const {
    screen,
    changeScreen,
    screenFromTo,
    containerSize,
    menuLOLTransition,
    authOpen,
    setAuthOpen,
    lists,
    setLists,
  } = useContext(AppContext);
  const strokeContainerRef = useRef();

  //TODO ?
  useEffect(() => {
    // setStrokeElementHeight(strokeContainerRef.current.clientHeight);
    setStrokeElementHeight(100);
  }, []);

  function openAuthHandler() {
    setAuthOpen(!authOpen);
  }
  async function deleteListButton() {
    let listDeleted = false;
    let listId = '';
    // Search listID
    const newLists = await lists.map((item) => {
      if (item.order === order) {
        listId = item._id;
        console.log(listId);
        listDeleted = true;
        lists.splice(order, 1);
      }
      // changing oerder elements after deleted element
      else if (listDeleted) {
        item.order = item.order - 1;
      }
      return item;
    });
    // After the item is deleted it will be empty ! at the end of array !
    newLists.length = newLists.length - 1;

    //* State
    setLists(newLists);

    //* Local Storage
    // Changing in the listOfLIst.jsx only! useEffect(list)

    //* FETCH
    listId ? deleteListFetch(listId) : null; //if _id = undefinde it's means this list not be added on server
  }

  function openListEditing() {
    let listId = '';
    lists.map((item) => {
      if (item.order === order) {
        listId = item._id;
      }
    });
    console.log(listId);
    changeScreen('ListEditing');
  }

  //Style
  let strokeContainerStyle = {
    marginBottom: `${120 - menuLOLTransition * 100}px`,
    transform: `translateX(${
      axis === 'horizontal' ? (order + 1) * containerSize.x * (pos === 'left' ? 1 : -1) : 0
    }px)`,
  };
  let AniametionCSS = {};

  if (screenFromTo === 'ListOfList>>>ListEditing') {
    AniametionCSS = {
      animation:
        parrentType === 'ListEditing' ? 'openListEditing 1s 1 linear' : 'clouseStroke 1s 1 linear',
    };
  } else if (screenFromTo === 'ListEditing>>>ListOfList') {
    AniametionCSS = {
      // animation: parrentType === 'ListEditing' ? 'clouseStroke 1s 1 linear' : 'openStroke 1s 1 linear',
      animation:
        parrentType === 'ListEditing' ? 'clouseListEditing 1s 1 linear' : 'openStroke 1s 1 linear',
    };
  }

  return (
    <>
      <div
        ref={strokeContainerRef}
        className={`stroke ${screen} parrent-${parrentType} ${axis} ${
          order === 0 ? 'firstElement' : 'nonFirstElement'
        }`}
        //* margin
        style={parrentTypeSettings === 'Settings' ? { marginBottom: `40px` } : strokeContainerStyle}
      >
        {children}
        <div className='h1'>
          {parrentTypeSettings != 'Settings' && order === 0 ? <ButtonDrag rotate='top' /> : null}

          <Button
            ButtonOnClickHandler={deleteListButton}
            type={`${parrentTypeSettings === 'Settings' ? 'tick' : 'exit'}`}
            position='left'
            parrentType={'StrokeElement'}
            parrentTypeSettings={parrentTypeSettings}
          />
          <div
            className='textH1'
            style={parrentTypeSettings === 'Settings' ? { fontSize: '24px' } : AniametionCSS}
          >
            {textH1}
            {parrentTypeSettings != 'Settings' && order === 0 ? (
              <>
                <ButtonDrag rotate='left' />
                <ButtonDrag rotate='right' />
              </>
            ) : null}
          </div>
          <Button
            ButtonOnClickHandler={parrentType === 'ListOfList' ? openListEditing : openAuthHandler}
            type={`${parrentTypeSettings === 'Settings' ? 'edit' : 'edit'}`}
            position='right'
            parrentType={'StrokeElement'}
            parrentTypeSettings={parrentTypeSettings}
          />
        </div>
        <div className={textH2 ? 'h2' : 'h2Off'} style={AniametionCSS}>
          <div className='textH2'>{textH2 + ':'}</div>
          <div className='countH2'>{countH2}</div>
        </div>
        <div className={textH3 ? 'h3' : 'h3Off'} style={AniametionCSS}>
          <div className='textH3'>{textH3 + ':'}</div>
          <div className='countH3'>{countH3}</div>
        </div>
        <div
          className={line ? 'stroke-line' : ''}
          style={
            parrentTypeSettings === 'Settings'
              ? null
              : {
                  marginTop: `${120 - menuLOLTransition * 100}px`,
                  opacity: `${menuLOLTransition * 0.2}`,
                }
          }
        ></div>
      </div>
    </>
  );
}

export default StrokeElement;
