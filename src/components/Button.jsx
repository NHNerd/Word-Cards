import { useContext } from 'react';

import './Button.css';

import { ScreenContext } from '../App';

function Button({ parrentType, text, type, position, menuLOLTransition, containerSize }) {
  // Get value from context
  const [screen, changeScreen] = useContext(ScreenContext);

  let buttonStyles = {};
  let buttonBgLeftStyles = {};
  let buttonBgRightStyles = {};

  if (parrentType === 'Fork') {
    buttonStyles.width = `${Math.round(42 * 1.43)}px`;
    buttonStyles.height = `${Math.round(30 * 1.43)}px`;
    buttonStyles.opacity = menuLOLTransition;
    if (position === 'left') {
      buttonStyles.left = `-${containerSize.x * 0.06}px`;
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * -containerSize.x * 0.52}px)`;
    } else if (position === 'right') {
      buttonStyles.right = `-${containerSize.x * 0.06}px`;
      buttonStyles.transform = `translate(${(1 - menuLOLTransition) * containerSize.x * 0.52}px)`;
    }
    buttonBgLeftStyles.transform = `translateX(${-containerSize.x * 0.05}px)`;
    buttonBgRightStyles.transform = `translateX(${containerSize.x * 0.05}px)`;
  } else {
    buttonStyles.transform = `scale(${menuLOLTransition * 0.6 + 0.4})`;
    buttonStyles.opacity = `${menuLOLTransition}`;

    buttonBgLeftStyles.transform = `translateX(${-5}px)`;
    buttonBgRightStyles.transform = `translateX(${5}px)`;
  }

  return (
    <>
      <div
        onClick={() => changeScreen('ListOfList')}
        className={`button button-position-${position}`}
        style={buttonStyles}
      >
        <div className='bg-left' style={buttonBgLeftStyles}></div>
        <div className={type}>{text}</div>
        <div className='bg-right' style={buttonBgRightStyles}></div>
      </div>
    </>
  );
}

export default Button;
