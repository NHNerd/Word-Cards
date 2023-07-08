import './Burger.css';

function Burger({ onClick }) {
  return (
    <>
      <div onClick={onClick} className='burger'>
        <div className='burger-line'></div>
      </div>
    </>
  );
}

export default Burger;
