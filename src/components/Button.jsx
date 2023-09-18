import { useContext, useRef, useEffect } from 'react';

import './Button.css';

import { AppContext } from '../App';

function Button({ parrentType, text, type, position, onClickHandler, forkState }) {
  // Get value from context
  const { screen, changeScreen, menuLOLTransition, containerSize } = useContext(AppContext);

  let buttonStyles = {};
  let buttonBgLeftStyles = {};
  let buttonBgRightStyles = {};

  const inputSearchRef = useRef(null);
  const inputAddRef = useRef(null);

  // Set focus on input
  useEffect(() => {
    if (inputSearchRef.current && forkState === 'forkSearch') {
      inputSearchRef.current.focus();
      return;
    }
    if (inputAddRef.current && forkState === 'forkAdd') {
      inputAddRef.current.focus();
    }
  }, [forkState]);

  if (parrentType === 'Fork') {
    if (screen != 'ListOfList') {
      buttonStyles.opacity = menuLOLTransition;
    }

    if (position === 'left' && forkState != 'forkSearch') {
      buttonStyles.left = `-${containerSize.x * 0.06}px`;
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * -containerSize.x * 0.52}px)`;
    } else if (position === 'right' && forkState != 'forkAdd') {
      buttonStyles.right = `-${containerSize.x * 0.06}px`;
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * containerSize.x * 0.52}px)`;
    }

    // bracsec
    buttonBgLeftStyles.transform = `translateX(${-containerSize.x * 0.05}px)`;
    buttonBgRightStyles.transform = `translateX(${containerSize.x * 0.05}px)`;
  } else {
    if (position === 'left') {
      buttonStyles.transform = `scale(${menuLOLTransition * 0.6 + 0.4})`;
      buttonStyles.opacity = `${menuLOLTransition}`;
    }

    buttonBgLeftStyles.transform = `translateX(${-5}px)`;
    buttonBgRightStyles.transform = `translateX(${5}px)`;
  }

  //

  return (
    <>
      <button
        onClick={() => onClickHandler()}
        // onClick={() => changeScreen('ListOfList')}
        className={`button button-position-${position} ${forkState} ${parrentType}`}
        style={buttonStyles}
      >
        <div className='bg-left' style={buttonBgLeftStyles}></div>
        <div className={`img ${type} ${forkState}`}>{text}</div>
        <div className='bg-right' style={buttonBgRightStyles}></div>
        {type === 'search' ? <input className='inputSearch' ref={inputSearchRef}></input> : null}
        {type === 'add' ? <input className='inputAdd' ref={inputAddRef}></input> : null}
      </button>
    </>
  );
}

export default Button;
