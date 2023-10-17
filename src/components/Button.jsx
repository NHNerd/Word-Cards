import React from 'react';

import './Button.css';

import { AppContext } from '../App';

function Button({
  children,
  parrentType,
  parrentTypeSettings,
  text,
  type,
  position,
  ButtonOnClickHandler,
  forkState,
  setInputValue,
  inputValue,
}) {
  // Get value from context
  const { screen, changeScreen, menuLOLTransition, containerSize } = React.useContext(AppContext);

  let buttonStyles = {};
  let buttonBgLeftStyles = {};
  let buttonBgRightStyles = {};

  const inputSearchRef = React.useRef(null);
  const inputAddRef = React.useRef(null);

  // Set focus on input
  React.useEffect(() => {
    if (inputSearchRef.current && forkState === 'forkSearch') {
      inputSearchRef.current.focus();
      return;
    }
    if (inputAddRef.current && forkState === 'forkAdd') {
      inputAddRef.current.focus();
    }
  }, [forkState]);
  // if(parrentTypeSettings != 'Settings')
  //* Animation
  if (parrentType === 'Fork' && parrentTypeSettings != 'Settings') {
    if (screen != 'ListOfList') {
      buttonStyles.opacity = menuLOLTransition;
    } else {
      buttonStyles.transition = '0.25s ease-out';
    }
    // opening
    if (position === 'left' && forkState != 'forkSearch') {
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * -containerSize.x * 0.52}px)`;
    } else if (position === 'right' && forkState != 'forkAdd') {
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * containerSize.x * 0.52}px)`;
    }

    // if input Emty button submit is not active
    if (type === 'tick' && inputValue === '') {
      buttonStyles.opacity = 0.4;
      buttonStyles.pointerEvents = 'none';
    }
  } else if (parrentTypeSettings != 'Settings') {
    if (position === 'left') {
      // opacity: delite in Menu screen
      buttonStyles.opacity = `${menuLOLTransition}`;
    }
  }

  //

  return (
    <>
      <button
        onClick={() => ButtonOnClickHandler()}
        // onClick={() => changeScreen('ListOfList')}
        className={`button button-position-${position} ${forkState} ${parrentType}`}
        style={buttonStyles}
      >
        <div className='bg-left' style={buttonBgLeftStyles}></div>
        <div className={`img ${type} ${forkState}`}>{text}</div>
        <div className='bg-right' style={buttonBgRightStyles}></div>

        {/* input */}
        {type === 'search' || type === 'add' ? (
          <input
            className={`input${type === 'search' ? 'Search' : 'Add'}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // onBlur={() => setInputValue('')}
            ref={type === 'search' ? inputSearchRef : inputAddRef}
            maxLength={16}
            required
          ></input>
        ) : null}

        {children}
      </button>
    </>
  );
}

const MemoizedButton = React.memo(Button);
export default MemoizedButton;
