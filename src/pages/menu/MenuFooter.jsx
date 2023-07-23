import StrokeElement from '../../components/StrokeElement.jsx';

import './MenuFooter.css';

function MenuFooter() {
  return (
    <>
      {/* <span className='list'>
        list #1
        <Edit />
      </span>
      <span className='text'>word count: 176</span>
      <span className='text'>game count: 38</span> */}

      <StrokeElement
        textH1={'List #1'}
        textH2={'word count'}
        countH2={231}
        textH3={'game count'}
        countH3={126}
        // line={true}
      />
    </>
  );
}

export default MenuFooter;
