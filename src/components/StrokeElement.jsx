import './StrokeElement.css';

function StrokeElement({ text }) {
  return (
    <>
      <div className='element'>
        <div className='text'>{text}</div>
        <div className='line'></div>
      </div>
    </>
  );
}

export default StrokeElement;
