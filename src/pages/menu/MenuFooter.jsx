import Edit from '../../components/Edit.jsx';

import './MenuFooter.css';

function MenuFooter() {
  return (
    <>
      <div className='start-container-footer'>
        <span className='list'>
          list #1
          <Edit />
        </span>
        <span className='text'>word count: 176</span>
        <span className='text'>game count: 38</span>
      </div>
    </>
  );
}

export default MenuFooter;
