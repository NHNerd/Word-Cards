// import ScreenSize from './handlers/Sizes.js';
import { useState, useContext } from 'react';

import { isMobile } from 'react-device-detect';

import { ScreenContext } from '../../App';

import './Draggable.css';

function Draggable(props) {
  const [screen, changeScreen] = useContext(ScreenContext);

  const marginBottom = Math.round(props.containerSize.y * 0.1);
  const marginTop = Math.round(props.containerSize.y * 0.16);
  const totalDistanceY = props.containerSize.y - props.strokeElemenHeight - marginBottom - marginTop;

  const [isTaping, setIsTaping] = useState(false);
  const [transformOld, setTransformOld] = useState(0);
  const [transform, setTransform] = useState(0);
  const [correct, setCorrect] = useState(0);
  // const [menuLOLTransition, setMenuLOLTransition] = useState(0);

  let eventHandlers = {
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUpLeave,
    onPointerLeave: handlePointerUpLeave,
  };

  if (isMobile) {
    eventHandlers = {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onTouchCancel: handleTouchEnd,
    };
  }

  //Pc
  function handlePointerDown(e) {
    setIsTaping(true);
    setCorrect(Math.max(0, Math.min(totalDistanceY, props.containerSize.y - e.clientY - transformOld)));
  }
  function handlePointerMove(e) {
    e.clientY;
    if (isTaping) {
      setTransform(Math.max(0, Math.min(totalDistanceY, props.containerSize.y - (e.clientY + correct))));
      props.setMenuLOLTransition(1 - (totalDistanceY - transform) / totalDistanceY);
    }
  }
  function handlePointerUpLeave() {
    setIsTaping(false);
    setTransformOld(transform);
    if (props.menuLOLTransition === 1) {
      changeScreen('ListOfList');
    } else {
      changeScreen('Menu');
    }
  }

  //Mobile
  function handleTouchStart(e) {
    setIsTaping(true);
    const touchY = e.touches[0].clientY;
    setCorrect(Math.max(0, Math.min(totalDistanceY, props.containerSize.y - touchY - transformOld)));
  }

  function handleTouchMove(e) {
    if (isTaping) {
      const touchY = e.touches[0].clientY;
      setTransform(Math.max(0, Math.min(totalDistanceY, props.containerSize.y - (touchY + correct))));
      props.setMenuLOLTransition(1 - (totalDistanceY - transform) / totalDistanceY);
    }
  }

  function handleTouchEnd() {
    setIsTaping(false);
    setTransformOld(transform);
    if (props.menuLOLTransition === 1) {
      changeScreen('ListOfList');
    } else {
      changeScreen('Menu');
    }
  }

  return (
    <>
      <div
        className='draggable-wrap'
        {...(screen === 'Menu' ? eventHandlers : {})}
        style={
          screen === 'Menu'
            ? {
                height: `${props.strokeElemenHeight + marginBottom}px`,
                bottom: `${0}px`,
                paddingTop: `40px`,
                transform: `translateY(-${transform}px)`,
              }
            : {
                height: `${props.containerSize.y - marginTop}px`,
                top: `${0}px`,
                paddingTop: `${marginTop}px`,
                transform: `translateY(${transformOld - transform}px)`,
                overflowY: 'scroll',
              }
        }
      >
        {props.children}
      </div>
    </>
  );
}
export default Draggable;
