import { useContext } from 'react';

import './PlayCard.css';

import { AppContext } from '../App';
let text = 'Go';
let textClass = 'text';

function PlayCard() {
  // Get value from context
  const { screen, changeScreen, containerSize, menuLOLTransition } = useContext(AppContext);

  if (screen === 'Menu') {
    textClass = 'text';
    text = 'go';
  }
  if (screen === 'Session') {
    textClass = 'text';
    text = 'Card text...';
  } else {
    textClass = 'off';
  }
  // let text = screen === 'Menu' ? 'go' : 'cardText';

  return (
    <>
      {/*? scale-warp need for applay the translate change on all moving component */}
      <div
        className='scale-warp'
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          opacity: `${1 - menuLOLTransition}`,
          transform: `translate(-50%, -50%) scale(${1 - menuLOLTransition})`,
        }}
      >
        <div
          onClick={() => changeScreen('Session')}
          className={screen !== 'Menu' && screen !== 'Session' ? `startBtn other` : `startBtn ${screen}`}
        >
          <div
            className={textClass}
            style={{
              transform: `translate(-50%, -50%) scale(${0.2 + (containerSize.y / 1000) * 0.8})`,
            }}
          >
            {text}
          </div>
        </div>
      </div>
    </>
  );
}

export default PlayCard;
