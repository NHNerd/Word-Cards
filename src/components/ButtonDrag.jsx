import './ButtonDrag.css';

function ButtonDrag({ rotate }) {
  return (
    <>
      <div className={`ButtonDrag ButtonDrag-${rotate}`}>
        <div className='xyu'></div>
      </div>
    </>
  );
}

export default ButtonDrag;
