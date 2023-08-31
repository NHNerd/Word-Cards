import { useContext } from 'react';

import { AppContext } from '../App';
import './Statistic.css';

function Statistic() {
  const { menuLOLTransition } = useContext(AppContext);
  // let test = Math.max(1, (1 - menuLOLTransition) * 2) - 1;
  // let test2 = Math.max(1, menuLOLTransition * 2) - 1;

  return (
    <>
      <div
        className='statistic'
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

export default Statistic;
