// import ScreenSize from './handlers/Sizes.js';
import { useState, useContext, useEffect } from 'react';

import { isMobile } from 'react-device-detect';

import { AppContext } from '../../App';

import './Draggable.css';

function Draggable(props) {
  const { screen, changeScreen, containerSize, strokeElemenHeight, menuLOLTransition } =
    useContext(AppContext);

  const marginTop = Math.round(containerSize.y * 0.16);
  const marginBottom = Math.round(containerSize.y * 0.1);
  const totalDistanceY = containerSize.y - strokeElemenHeight - marginBottom - marginTop;

  const [isTaped, setIsTaped] = useState(false);
  const [transformOld, setTransformOld] = useState(0);
  const [transform, setTransform] = useState(0);
  const [transformDown, setTransformDown] = useState(0);
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
    if (!isMobile) {
      e.preventDefault();
    }
    const clientY = isMobile ? e.touches[0].clientY : e.clientY;
    const transformNotClump = containerSize.y - clientY - transformOld;
    setIsTaped(true);
    setCorrect(Math.max(0, Math.min(totalDistanceY, transformNotClump)));

    setTransformDown(clientY);
  }
  function handleEventMove(e) {
    if (!isMobile) {
      e.preventDefault();
    }
    //TODO now have problem when drug to - when return mosue to + component not move
    if (isTaped) {
      const clientY = isMobile ? e.touches[0].clientY : e.clientY;
      const transformNotClump = containerSize.y - (clientY + correct);
      setTransform(Math.max(0, Math.min(totalDistanceY, transformNotClump)));
      setTransform(setTransform);
      props.setMenuLOLTransition(1 - (totalDistanceY - transform) / totalDistanceY);
    }
  }
  function handleEventUpLeave() {
    if (isTaped) {
      setIsTaped(false);
      setTransformOld(transform);
      changeScreen(menuLOLTransition === 1 ? 'ListOfList' : 'Menu');
    }
  }

  useEffect(() => {
    let animationFrameId;

    function transitionAutoCloser() {
      const closeTo = menuLOLTransition > 0.5 ? -1 : 1;
      // first value(20) is constant step, second value is distance dependent step => ( (70) in center of screen 0 on the edge )
      const step = 20 + (menuLOLTransition > 0.5 ? 1 - menuLOLTransition : menuLOLTransition) * 70;

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

        props.setMenuLOLTransition((prevMenuLOLTransition) =>
          Math.min(1, (totalDistanceY * prevMenuLOLTransition - step * closeTo) / totalDistanceY)
        );
      }
      animationFrameId = requestAnimationFrame(transitionAutoCloser);
    }

    transitionAutoCloser();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isTaped]);

  return (
    <>
      <div
        className='draggable-wrap'
        // if screen is not Menu => delite handlers
        {...(screen === 'Menu' ? eventHandlers : {})}
        style={
          screen === 'Menu'
            ? {
                height: `${strokeElemenHeight + marginBottom}px`,
                bottom: `${0}px`,
                paddingTop: `40px`,
                transform: `translateY(-${transform}px)`,
              }
            : {
                height: `${containerSize.y - marginTop}px`,
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
