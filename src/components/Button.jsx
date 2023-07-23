import { useContext } from 'react';

import './Button.css';

import { ScreenContext } from '../App';

function Button({ text, type, position }) {
  // Get value from context
  const [screen, changeScreen] = useContext(ScreenContext);

  return (
    <>
      <div onClick={() => changeScreen('ListEditing')} className={`button button-position-${position}`}>
        <div className='bg-left'></div>
        <div className={type}>{text}</div>
        <div className='bg-right'></div>
      </div>
    </>
  );
}

export default Button;
