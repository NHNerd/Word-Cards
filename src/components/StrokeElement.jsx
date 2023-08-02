import { useContext } from 'react';
import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';

import { ScreenContext } from '../App.jsx';

import './StrokeElement.css';

function StrokeElement({ textH1, textH2, countH2, textH3, countH3, line, isButtonDrag }) {
  const [screen, changeScreen] = useContext(ScreenContext);
  return (
    <>
      <div className={`stroke-container ${screen}`}>
        {isButtonDrag ? <ButtonDrag rotate='top' /> : null}

        <div className='h1'>
          {isButtonDrag ? <ButtonDrag rotate='left' /> : null}
          <Button type='exit' position='left' />
          <div className='textH1'>{textH1}</div>
          {isButtonDrag ? <ButtonDrag rotate='right' /> : null}
          <Button type='edit' position='right' />
        </div>
        <div className={textH2 ? 'h2' : 'h2Off'}>
          <div className='textH2'>{textH2 + ':'}</div>
          <div className='countH2'>{countH2}</div>
        </div>
        <div className={textH3 ? 'h3' : 'h3Off'}>
          <div className='textH3'>{textH3 + ':'}</div>
          <div className='countH3'>{countH3}</div>
        </div>
        <div className={line ? 'stroke-line' : ''}></div>
      </div>
    </>
  );
}

export default StrokeElement;
