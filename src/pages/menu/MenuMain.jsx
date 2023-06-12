import { useState, useEffect } from 'react';

import '../../components/play-card.css';

// import '../components/Card.css';

function MenuMain({ changeScreen }) {
  const [isCircle, setIsCircle] = useState(false);

  const onClickStartBtn = () => {
    changeScreen('Session');
  };

  useEffect(() => {
    setIsCircle(!isCircle);
  }, [changeScreen]);

  return (
    <>
      <div onClick={onClickStartBtn} className={`startBtn ${isCircle ? 'play' : 'card'}`}>
        <span className='text'>go</span>
      </div>
    </>
  );
}

export default MenuMain;
