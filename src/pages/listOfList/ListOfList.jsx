import MainListOfList from './MainListOfList.jsx';
import HeaderListOfList from './HeaderListOfList.jsx';

import './ListOfList.css';

function ListOfList() {
  return (
    <>
      <div className='zzzz'></div>
      <div className='header headerListOfList header-border'>
        <HeaderListOfList />
      </div>
      <div className='main mainListOfList main-border'>
        <MainListOfList />
      </div>
      <div className='footer footerListOfList footer-border'>{/* <MenuFooter /> */}</div>
    </>
  );
}

export default ListOfList;
