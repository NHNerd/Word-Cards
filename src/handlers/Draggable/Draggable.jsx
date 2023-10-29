// import ScreenSize from './handlers/Sizes.js';
import { useState, useContext, useEffect } from 'react';

import { isMobile } from 'react-device-detect';

import { AppContext } from '../../App';
import { increase, decrease } from '../listOrderHandler.js';

import './Draggable.css';

function Draggable(props) {
  const { screen, changeScreen, containerSize, strokeElemenHeight, menuLOLTransition, LOLOrder } =
    useContext(AppContext);

  const marginTop = Math.round(containerSize.y * 0.16);
  const marginBottom = Math.round(containerSize.y * 0.1);
  const totalDistanceY = containerSize.y - strokeElemenHeight - marginBottom - marginTop;

  // const [LOLOrder, setLOLOrder] = useState(0);
  const [isTaped, setIsTaped] = useState(false);
  const [transformOld, setTransformOld] = useState({ x: 0, y: 0 });
  const [transformOldUseeffetX, setTransformOldUseeffetX] = useState(0);
  const [transform, setTransform] = useState({ x: 0, y: 0 });
  const [correct, setCorrect] = useState(0);
  const [toWard, setToWard] = useState('NaN');
  const [buttonDrag, setButtonDrag] = useState({ left: false, right: false });

  const eventHandlers = isMobile
    ? {
        onTouchStart: handleEventDown,
        onTouchMove: handleEventMove,
        onTouchEnd: handleEventUp,
        onTouchCancel: handleEventLeave,
      }
    : {
        onPointerDown: handleEventDown,
        onPointerMove: handleEventMove,
        onPointerUp: handleEventUp,
        onPointerLeave: handleEventLeave,
      };

  function handleEventDown(e) {
    if (!isMobile) {
      e.preventDefault();
    }
    //Vertical
    const userInputDevice = isMobile ? e.touches[0] : e;
    const client = {
      x: userInputDevice.clientX,
      y: userInputDevice.clientY,
    };
    const transformNotClump = containerSize.y - client.y - transformOld.y;
    setIsTaped(true);
    setCorrect(Math.max(0, Math.min(totalDistanceY, transformNotClump)));
    //horizontal
    setTransformOld({ x: client.x });
  }
  function handleEventMove(e) {
    if (!isMobile) {
      e.preventDefault();
    }
    //TODO now have problem when drug to - when return mosue to + component not move
    //TODO It seems solved aftere added screen stransist :)) (but it's not exactly)
    if (isTaped) {
      const userInputDevice = isMobile ? e.touches[0] : e;
      const client = {
        x: userInputDevice.clientX,
        y: userInputDevice.clientY,
      };

      let transformNotClumpX = client.x - transformOld.x;
      let transformNotClumpY = containerSize.y - (client.y + correct);
      const toWardThreshold = 10; //? after 10px the final direction will be chosen

      if (toWard === 'NaN') {
        // Toward befaore final toward
        if (Math.abs(transformNotClumpX) > Math.max(0, transformNotClumpY)) {
          transformNotClumpY = 0;
        } else {
          transformNotClumpX = 0;
        }
        // Final toward
        if (Math.round(Math.abs(transformNotClumpX)) >= toWardThreshold && toWard === 'NaN') {
          setToWard('x');
        }
        if (Math.round(transformNotClumpY) >= toWardThreshold && toWard === 'NaN') {
          setToWard('y');
        }
      }

      setTransform({
        x: toWard === 'y' ? 0 : transformNotClumpX + transformOldUseeffetX,
        y: toWard === 'x' ? 0 : Math.max(0, Math.min(totalDistanceY, transformNotClumpY)),
      });

      props.setMenuLOLTransition(1 - (totalDistanceY - transform.y) / totalDistanceY);
    }
  }
  function handleEventUp(e) {
    if (transform.y < 6 && transform.x < 6 && transform.x > -6) {
      if (e.target.className === 'ButtonDrag-right') {
        setButtonDrag({ left: false, right: true });
      }
      if (e.target.className === 'ButtonDrag-left') {
        setButtonDrag({ left: true, right: false });
      }
    }

    if (isTaped) {
      //Vertical
      setIsTaped(false);
      setTransformOld({ x: transform.x, y: transform.y });
      changeScreen(menuLOLTransition === 1 ? 'ListOfList' : 'Menu');
      setToWard('NaN');
    }
    //horizontal
  }

  function handleEventLeave() {
    if (isTaped) {
      //Vertical
      setIsTaped(false);
      setTransformOld({ x: transform.x, y: transform.y });
      changeScreen(menuLOLTransition === 1 ? 'ListOfList' : 'Menu');
      setToWard('NaN');
    }
    //horizontal
  }

  function transitionAutoCloserY(step, invertTowardY) {
    if (!isTaped && transform.y > 0) {
      setTransform((prevTransform) => {
        const newTransform = Math.min(totalDistanceY, prevTransform.y - step.y * invertTowardY);
        setTransformOld({ x: 0, y: newTransform });
        if (newTransform <= 0 || newTransform >= totalDistanceY) {
          cancelAnimationFrame(animationFrameId);
          //TODO Workaround(setTimeout)! changeScreen fires before render Draggable or App components
          if (newTransform >= totalDistanceY) {
            setTimeout(() => {
              changeScreen('ListOfList');
            }, 10);
          } else {
            return { x: 0, y: 0 };
          }
        }
        return { x: 0, y: newTransform };
      });

      props.setMenuLOLTransition((prevMenuLOLTransition) =>
        Math.min(1, (totalDistanceY * prevMenuLOLTransition - step.y * invertTowardY) / totalDistanceY)
      );
      animationFrameId = requestAnimationFrame(transitionAutoCloser);
    }
  }

  function transitionAutoCloserX(step, invertTowardY) {
    if (!isTaped && (Math.abs(transform.x) > 0 || buttonDrag.right || buttonDrag.left)) {
      const invertTowardX = buttonDrag.left ? -1 : transform.x < 0 ? -1 : 1;

      setTransform((prevTransform) => {
        let newTransformX = prevTransform.x + step.x * invertTowardX;

        //forward
        if (Math.abs(transform.x) > containerSize.x / 4 || buttonDrag.right || buttonDrag.left) {
          newTransformX = Math.min(containerSize.x, Math.max(-containerSize.x, newTransformX));
        }
        //backward
        else {
          newTransformX = prevTransform.x - step.x * invertTowardX;
        }
        //Stop
        if (Math.abs(newTransformX) >= containerSize.x || newTransformX * invertTowardX <= 0) {
          cancelAnimationFrame(animationFrameId);
          setButtonDrag({ left: false, right: false });
          if (Math.abs(transform.x) > containerSize.x / 4 || buttonDrag.right || buttonDrag.left) {
            //TODO Workaround(setTimeout)! changeScreen fires before render Draggable or App components
            setTimeout(() => {
              // newTransformX > 0 ? props.setLOLOrder(LOLOrder + 1) : props.setLOLOrder(LOLOrder - 1);

              newTransformX > 0
                ? props.setLOLOrder(increase(LOLOrder))
                : props.setLOLOrder(decrease(LOLOrder));
            }, 10);
          }
          return { x: 0, y: 0 };
        }
        return { x: newTransformX, y: 0 };
      });
      animationFrameId = requestAnimationFrame(transitionAutoCloser);
    } else {
      setTransformOldUseeffetX(transform.x);
    }
  }

  let animationFrameId;
  function transitionAutoCloser() {
    const invertTowardY = menuLOLTransition > 0.5 ? -1 : 1;
    // speed is constant step, acceleration is distance dependent step => ( MAX acceleration in center of screen,  MIN acceleration on the edge )
    const speed = 5;
    const acceleration = 80;
    const step = {
      //TODO Add acseleration for X axis
      x: 30,
      y: speed + (menuLOLTransition > 0.5 ? 1 - menuLOLTransition : menuLOLTransition) * acceleration,
    };

    // *** HORIZONTAL ***
    transitionAutoCloserX(step, invertTowardY);

    // *** VERTICAL ***
    transitionAutoCloserY(step, invertTowardY);
  }

  //TODO Add condition: swipe speed
  useEffect(() => {
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
                transform: `translate(${transform.x}px,-${transform.y}px)`,
              }
            : {
                height: `${containerSize.y - marginTop}px`,
                top: `${0}px`,
                
                paddingTop: `${marginTop}px`,
                transform: `translateY(${transformOld.y - transform.y}px)`,
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
