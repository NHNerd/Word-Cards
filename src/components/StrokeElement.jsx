import ButtonDrag from './ButtonDrag.jsx';
import Button from './Button.jsx';

import './StrokeElement.css';

function StrokeElement({ textH1, textH2, countH2, textH3, countH3, line }) {
  return (
    <>
      <div className='stroke-container'>
        <ButtonDrag rotate='top' />
        <div className='h1'>
          <ButtonDrag rotate='left' />
          <div className='textH1'>{textH1}</div>
          <ButtonDrag rotate='right' />
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
