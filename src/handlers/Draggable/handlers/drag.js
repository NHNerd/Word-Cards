import { useState } from 'react';

function Drag() {
  const [isButtonTap, setIsButtonTap] = useState(false);
  const [elementDownPos, setElementDownPos] = useState({ x: 0, y: 0 });
  const [elementPosition, setElementPosition] = useState({ x: 0, y: 0 });

  //PC
  function handlePointerDown(e) {
    setElementDownPos({ x: e.clientX, y: e.clientY });
    setIsButtonTap(true);
  }

  function handlePointerUp() {
    setIsButtonTap(false);
  }

  function handlePointerMove(e) {
    if (isButtonTap) {
      setElementPosition((prevPosition) => ({
        x: e.clientX - elementDownPos.x + prevPosition.x,
        y: e.clientY - elementDownPos.y + prevPosition.y,
      }));
      setElementDownPos({ x: e.clientX, y: e.clientY });
    }
  }

  //Mobile
  function handleTouchStart(e) {
    let touches = e.touches;
    // Noumber of touch
    let firstTouch = touches[0];
    let touchPos = { x: firstTouch.clientX, y: firstTouch.clientY };
    setElementDownPos(touchPos);
    setIsButtonTap(true);
  }
  function handleTouchEnd() {
    setIsButtonTap(false);
  }
  function handleTouchMove(e) {
    if (isButtonTap) {
      let touches = e.touches;
      // Noumber of touch
      let firstTouch = touches[0];
      let touchPos = { x: firstTouch.clientX, y: firstTouch.clientY };
      setElementPosition((prevPosition) => ({
        x: touchPos.x - elementDownPos.x + prevPosition.x,
        y: touchPos.y - elementDownPos.y + prevPosition.y,
      }));
      setElementDownPos(touchPos);
    }
  }

  // console.log(elementDownY);
  return {
    handlePointerDown,
    handlePointerUp,
    handlePointerMove,
    elementPosition,
    handleTouchMove,
    handleTouchStart,
    handleTouchEnd,
  };
}

export default Drag;
