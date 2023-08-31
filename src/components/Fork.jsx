import { useContext } from 'react';
import Button from './Button.jsx';

import { AppContext } from '../App.jsx';

import './Fork.css';

function Fork() {
  const { screen, containerSize, menuLOLTransition } = useContext(AppContext);

  const marginTop = containerSize.y * 0.04;

  return (
    <>
      <div className={`fork-bg ${screen}`}></div>
      <div
        className={`fork-container fork-${screen}`}
        style={{
          top: `${marginTop}px`,
        }}
      >
        <Button
          type='search'
          position='left'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
        />
        <div className={`fork-line ${screen}`}></div>
        <Button
          type='add'
          position='right'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
        />
      </div>
    </>
  );
}

export default Fork;
