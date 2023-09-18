import { useContext, useState } from 'react';
import Button from './Button.jsx';

import { AppContext } from '../App.jsx';

import './Fork.css';

function Fork() {
  const { screen, containerSize, menuLOLTransition } = useContext(AppContext);

  const [forkState, setForkState] = useState('forkNon');

  const marginTop = containerSize.y * 0.04;
  const lineStyle = {};

  function searcHandler() {
    setForkState('forkSearch');
  }
  function addHandler() {
    setForkState('forkAdd');
  }
  function forkNonHandler() {
    setForkState('forkNon');
  }

  console.log(forkState);

  return (
    <>
      <div className={`fork-bg-header ${screen}`}></div>
      {forkState != 'forkNon' ? <div id='fork-bg' onClick={() => forkNonHandler()}></div> : null}

      <section
        id='fork'
        className={`fork-${screen}`}
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
          onClickHandler={searcHandler}
          forkState={forkState}
        />

        <div className={`fork-line ${screen} ${forkState}`} style={lineStyle}></div>
        <Button
          type='add'
          position='right'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
          onClickHandler={addHandler}
          forkState={forkState}
        />
      </section>
    </>
  );
}

export default Fork;
