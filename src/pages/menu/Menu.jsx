import MenuMain from './MenuMain.jsx';
import MenuFooter from './MenuFooter.jsx';
import MenuHeader from './MenuHeader.jsx';

import './Main.css';

function Menu() {
  return (
    <>
      <div className='header headerMenu header-border'>
        <MenuHeader />
      </div>
      <div className='main mainMenu main-border'>
        <MenuMain />
      </div>
      <div className='footer footerMenu footer-border'>
        <MenuFooter />
      </div>
    </>
  );
}

export default Menu;
