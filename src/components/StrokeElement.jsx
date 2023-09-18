import { useContext, useState, useEffect, useRef } from 'react';
import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';

import { AppContext } from '../App.jsx';

import './StrokeElement.css';

// stroke-container
// container
function StrokeElement({
  setStrokeElementHeight,
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
  const { screen, changeScreen, containerSize, menuLOLTransition } = useContext(AppContext);
  const strokeContainerRef = useRef();

  useEffect(() => {
    setStrokeElementHeight(strokeContainerRef.current.clientHeight);
  }, []);

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
        style={strokeContainerStyle}
      >
        <div className='h1'>
          {order === 0 ? <ButtonDrag rotate='top' /> : null}
          <Button type='exit' position='left' parrentType={'StrokeElement'} />
          <div className='textH1'>
            {textH1}
            {order === 0 ? <ButtonDrag rotate='left' /> : null}
            {order === 0 ? <ButtonDrag rotate='right' /> : null}
          </div>
          <Button type='edit' position='right' parrentType={'StrokeElement'} />
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
