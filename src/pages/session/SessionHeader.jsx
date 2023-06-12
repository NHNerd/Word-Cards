import './GameHeader.css';

function SessionHeader({ changeScreen }) {
  const onClickPB = () => {
    changeScreen('Menu');
  };

  return (
    <>
      <div onClick={onClickPB} className='progressBar'>
        <div className='progressBar-scale'>
          <div className='progressBar-spark'></div>
        </div>
      </div>
    </>
  );
}

export default SessionHeader;
