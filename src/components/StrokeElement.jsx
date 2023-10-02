import { useContext, useState, useEffect, useRef } from 'react';
import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';

import { AppContext } from '../App.jsx';

import './StrokeElement.css';

function StrokeElement({
  setStrokeElementHeight,
  parrentTypeSettings,
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
}) {
  const { screen, changeScreen, containerSize, menuLOLTransition, authOpen, setAuthOpen } =
    useContext(AppContext);
  const strokeContainerRef = useRef();

  useEffect(() => {
    setStrokeElementHeight(strokeContainerRef.current.clientHeight);
  }, []);

  function openAuthHandler() {
    setAuthOpen(!authOpen);
  }

  //Style
  const strokeContainerStyle = {
    marginBottom: `${120 - menuLOLTransition * 100}px`,
    transform: `translateX(${
      axis === 'horizontal' ? (order + 1) * containerSize.x * (pos === 'left' ? 1 : -1) : 0
    }px)`,
  };

  return (
    <>
      <div
        ref={strokeContainerRef}
        className={`stroke ${screen}  ${axis} ${order === 0 ? 'firstElement' : 'nonFirstElement'}`}
        //* margin
        style={parrentTypeSettings === 'Settings' ? { marginBottom: `40px` } : strokeContainerStyle}
      >
        <div className='h1'>
          {parrentTypeSettings != 'Settings' && order === 0 ? <ButtonDrag rotate='top' /> : null}

          <Button
            type={`${parrentTypeSettings === 'Settings' ? 'tick' : 'exit'}`}
            position='left'
            parrentType={'StrokeElement'}
            parrentTypeSettings={parrentTypeSettings}
          />
          <div
            className='textH1'
            style={parrentTypeSettings === 'Settings' ? { fontSize: '24px' } : null}
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
            ButtonOnClickHandler={openAuthHandler}
            type={`${parrentTypeSettings === 'Settings' ? 'edit' : 'edit'}`}
            position='right'
            parrentType={'StrokeElement'}
            parrentTypeSettings={parrentTypeSettings}
          />
        </div>
        <div className={textH2 ? 'h2' : 'h2Off'}>
          <div className='textH2'>{textH2 + ':'}</div>
          <div className='countH2'>{countH2}</div>
        </div>
        <div className={textH3 ? 'h3' : 'h3Off'}>
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
