import { useContext } from 'react';

import './PlayCard.css';

import { ScreenContext } from '../App';
let text = 'Go';
function PlayCard() {
  // Get value from context
  const [screen, changeScreen] = useContext(ScreenContext);
  if (screen === 'Menu') {
    text = 'go';
  }
  if (screen === 'Session') {
    text = 'Card text...';
  }
  // let text = screen === 'Menu' ? 'go' : 'cardText';

  return (
    <>
      <div
        onClick={() => changeScreen('Session')}
        className={screen === 'Menu' ? 'startBtn play' : 'startBtn card'}
      >
        <div className='text'>{text}</div>
      </div>
    </>
  );
}

export default PlayCard;
