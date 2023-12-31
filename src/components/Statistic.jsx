import React from 'react';

import { AppContext } from '../App';
import './Statistic.css';

function Statistic() {
  const { menuLOLTransition } = React.useContext(AppContext);
  // let test = Math.max(1, (1 - menuLOLTransition) * 2) - 1;
  // let test2 = Math.max(1, menuLOLTransition * 2) - 1;

  return (
    <>
      <div
        id='statistic'
        style={{
          transform: `translateY(${-menuLOLTransition * 300}px) `,
        }}
      ></div>

      {/* <div
        className='fork-test'
        style={{
          transform: `translateX(-50%) scaleX(${menuLOLTransition}) `,
        }}
      ></div> */}
    </>
  );
}

const MemoizedStatistic = React.memo(Statistic);
export default MemoizedStatistic;
