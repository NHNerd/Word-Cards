import { useContext, useState, useEffect, useRef } from 'react';
import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';

import { ScreenContext } from '../App.jsx';

import './StrokeElement.css';

// stroke-container
// container
function StrokeElement({
  setStrokeElementHeight,
  menuLOLTransition,
  textH1,
  textH2,
  countH2,
  textH3,
  countH3,
  line,
  isButtonDrag,
  isFirstElement,
}) {
  const [screen, changeScreen] = useContext(ScreenContext);
  const strokeContainerRef = useRef();

  useEffect(() => {
    setStrokeElementHeight(strokeContainerRef.current.clientHeight);
  }, []);

  return (
    <>
      <div
        ref={strokeContainerRef}
        className={`stroke stroke-container ${screen} ${
          isFirstElement ? 'firstElement' : 'nonFirstElement'
        }`}
        style={{
          marginBottom: `${120 - menuLOLTransition * 100}px`,
        }}
      >
        {isFirstElement ? <ButtonDrag rotate='top' menuLOLTransition={menuLOLTransition} /> : null}

        <div className='h1'>
          {isFirstElement ? <ButtonDrag rotate='left' menuLOLTransition={menuLOLTransition} /> : null}
          <Button
            type='exit'
            position='left'
            menuLOLTransition={menuLOLTransition}
            parrentType={'StrokeElement'}
          />
          <div className='textH1'>{textH1}</div>
          {isFirstElement ? <ButtonDrag rotate='right' menuLOLTransition={menuLOLTransition} /> : null}
          <Button type='edit' position='right' />
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
          style={{
            marginTop: `${120 - menuLOLTransition * 100}px`,
            opacity: `${menuLOLTransition * 0.2}`,
          }}
        ></div>
      </div>
    </>
  );
}

export default StrokeElement;
