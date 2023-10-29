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
  progressBar,
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
  const h1Refs = useRef();
  const h2Refs = useRef();
  const h3Refs = useRef();

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
    console.log(1);
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
    console.log(listId); //!
    changeScreen('ListEditing');
  }

  //Style
  let strokeContainerStyle;
  if (screen !== 'ListEditing') {
    strokeContainerStyle = {
      height: `${186 - menuLOLTransition * 100}px`, // h1(34) + h2(20) + h3(16) + conteiner-line-MinHeight(16) = 86
      transform: `translateX(${
        axis === 'horizontal' ? (order + 1) * containerSize.x * (pos === 'left' ? 1 : -1) : 0
      }px)`,
    };
  }

  let AniametionDivsCSS = {};
  let aniametionProgressBarCSS = {};

  switch (screenFromTo) {
    case 'menu>>>ListOfList':
      break;
    case 'menu>>>ListEditing':
      break;
    case 'ListOfList>>>menu':
      break;
    case 'ListOfList>>>ListEditing':
      animationFlipHandler('Open', false);
      if (parrentType === 'ListOfList') {
        strokeContainerStyle = {
          animation: 'strokeHeightLolClose 1s linear 1 forwards',
        };
      } else if (parrentType === 'ListEditing') {
        strokeContainerStyle = {
          animation: `strokeHeightLeClose 1s linear 1 forwards`,
        };
      }
      break;
    case 'ListEditing>>>menu':
      break;
    case 'ListEditing>>>ListOfList':
      animationFlipHandler('Close', true);
      if (parrentType === 'ListOfList') {
        strokeContainerStyle = {
          animation: `strokeHeightLolOpen 1s linear 1 forwards`,
        };
      } else if (parrentType === 'ListEditing') {
        strokeContainerStyle = {
          animation: `strokeHeightLolOpen 1s linear 1 forwards`,
        };
      }

      break;
  }

  async function animationFlipHandler(animationStatus) {
    AniametionDivsCSS = {
      animation:
        parrentType === 'ListEditing'
          ? `flip${animationStatus === 'Open' ? 'Open' : 'Close'} 1s linear 1 forwards`
          : `flip${animationStatus === 'Open' ? 'Close' : 'Open'} 1s linear 1 forwards`,
    };

    aniametionProgressBarCSS = {
      animation: `flipProgressBar${animationStatus === 'Open' ? 'Open' : 'Close'} 1s linear 1 forwards`,
    };
  }

  return (
    <>
      <div
        ref={strokeContainerRef}
        className={`stroke ${screen} parrent-${parrentType} ${axis} ${
          order === 0 ? 'firstElement' : 'nonFirstElement'
        }`}
        // TODO Add visability off in end animation
        //* margin
        style={parrentTypeSettings === 'Settings' ? { marginBottom: `40px` } : strokeContainerStyle}
      >
        {children}
        <div ref={h1Refs} className='h1 '>
          {parrentTypeSettings != 'Settings' && order === 0 ? <ButtonDrag rotate='top' /> : null}

          {/*//* ListEditing */}
          {parrentType === 'ListEditing' ? (
            <div id='container-wordProgressBar' style={aniametionProgressBarCSS}>
              <div id='wordProgressBar' style={{ width: progressBar }}></div>
            </div>
          ) : null}
          <Button
            ButtonOnClickHandler={deleteListButton}
            type={`${parrentTypeSettings === 'Settings' ? 'tick' : 'exit'}`}
            position='left'
            parrentType={'StrokeElement'}
            parrentTypeSettings={parrentTypeSettings}
          />
          <div
            className='textH1'
            style={parrentTypeSettings === 'Settings' ? { fontSize: '24px' } : AniametionDivsCSS}
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
        <div ref={h2Refs} className={textH2 ? 'h2 ' : 'h2Off'} style={AniametionDivsCSS}>
          <div className='textH2'>{textH2 + ':'}</div>
          <div className='countH2'>{countH2}</div>
        </div>
        <div ref={h3Refs} className={textH3 ? 'h3 ' : 'h3Off'} style={AniametionDivsCSS}>
          <div className='textH3'>{textH3 + ':'}</div>
          <div className='countH3'>{countH3}</div>
        </div>
        {/*//* ListEditing */}
        {parrentType === 'ListEditing' ? <div id='h2h3HeightLE'></div> : null}
        <div className='stroke-container-line'>
          <div
            className={line ? 'stroke-line' : ''}
            style={
              parrentTypeSettings === 'Settings'
                ? null
                : {
                    opacity: `${menuLOLTransition * 0.2}`,
                  }
            }
          ></div>
        </div>
      </div>
    </>
  );
}

export default StrokeElement;
