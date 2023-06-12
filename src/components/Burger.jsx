import './Burger.css';

function Burger({ changeScreen }) {
  const onClickBurgerMenu = () => {
    changeScreen('StartScreen');
  };

  return (
    <>
      <div onClick={onClickBurgerMenu} className='burger'></div>
    </>
  );
}

export default Burger;
