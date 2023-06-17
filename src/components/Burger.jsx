import './Burger.css';

function Burger({ changeScreen, currentScreen, prevScreenRef }) {
  const onClickBurgerMenu = () => {
    changeScreen(currentScreen == 'Setting' ? prevScreenRef.current : 'Setting');
  };

  return (
    <>
      <div onClick={onClickBurgerMenu} className='burger'>
        <div className='burger-line'></div>
      </div>
    </>
  );
}

export default Burger;
