// import ScreenSize from './handlers/Sizes.js';
import { useState, useContext, useEffect } from 'react';

import { isMobile } from 'react-device-detect';

import { ScreenContext } from '../../App';

import './Draggable.css';

function Draggable(props) {
  const [screen, changeScreen] = useContext(ScreenContext);

  const marginTop = Math.round(props.containerSize.y * 0.16);
  const marginBottom = Math.round(props.containerSize.y * 0.1);
  const totalDistanceY = props.containerSize.y - props.strokeElemenHeight - marginBottom - marginTop;

  const [isTaped, setIsTapedisTaped] = useState(false);
  const [transformOld, setTransformOld] = useState(0);
  const [transform, setTransform] = useState(0);
  const [correct, setCorrect] = useState(0);

  const eventHandlers = isMobile
    ? {
        onTouchStart: handleEventDown,
        onTouchMove: handleEventMove,
        onTouchEnd: handleEventUpLeave,
        onTouchCancel: handleEventUpLeave,
      }
    : {
        onPointerDown: handleEventDown,
        onPointerMove: handleEventMove,
        onPointerUp: handleEventUpLeave,
        onPointerLeave: handleEventUpLeave,
      };

  function handleEventDown(e) {
    const clientY = isMobile ? e.touches[0].clientY : e.clientY;
    const transformNotClump = props.containerSize.y - clientY - transformOld;
    setIsTapedisTaped(true);
    setCorrect(Math.max(0, Math.min(totalDistanceY, transformNotClump)));
  }
  function handleEventMove(e) {
    if (isTaped) {
      const clientY = isMobile ? e.touches[0].clientY : e.clientY;
      const transformNotClump = props.containerSize.y - (clientY + correct);
      setTransform(Math.max(0, Math.min(totalDistanceY, transformNotClump)));
      props.setMenuLOLTransition(1 - (totalDistanceY - transform) / totalDistanceY);
    }
  }
  function handleEventUpLeave() {
    if (isTaped) {
      setIsTapedisTaped(false);
      setTransformOld(transform);
      changeScreen(props.menuLOLTransition === 1 ? 'ListOfList' : 'Menu');
    }
  }

  useEffect(() => {
    let animationFrameId;

    function transitionAutoCloser() {
      const closeTo = props.menuLOLTransition > 0.5 ? -1 : 1;
      // first value(20) is constant step, second value is distance dependent step => ( (70) in center of screen 0 on the edge )
      const step =
        20 +
        (props.menuLOLTransition > 0.5 ? 1 - props.menuLOLTransition : props.menuLOLTransition) * 70;

      if (!isTaped && transform > 0) {
        setTransform((prevTransform) => {
          const newTransform = Math.min(totalDistanceY, prevTransform - step * closeTo);
          setTransformOld(newTransform);
          if (newTransform <= 0 || newTransform >= totalDistanceY) {
            cancelAnimationFrame(animationFrameId);

            //TODO Workaround(setTimeout)! changeScreen fires before render Draggable or App components
            if (newTransform >= totalDistanceY) {
              setTimeout(() => {
                changeScreen('ListOfList');
              }, 10);
            } else {
              return 0;
            }
          }
          return newTransform;
        });

        props.setMenuLOLTransition(
          (prevMenuLOLTransition) =>
            (totalDistanceY * prevMenuLOLTransition - step * closeTo) / totalDistanceY
        );
      }
      animationFrameId = requestAnimationFrame(transitionAutoCloser);
    }

    transitionAutoCloser();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTaped]);

  console.log(transform);
  return (
    <>
      <div
        className='draggable-wrap'
        // if screen is not Menu => delite handlers
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
