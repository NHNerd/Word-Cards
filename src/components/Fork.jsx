import { useContext, useState } from 'react';
import Button from './Button.jsx';

import { AppContext } from '../App.jsx';

import './Fork.css';

function Fork() {
  const { screen, containerSize, menuLOLTransition } = useContext(AppContext);

  const [forkState, setForkState] = useState('forkNon');
  const [inputValue, setInputValue] = useState('');

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

    //clear
    setInputValue('');
  }

  function submitHandler() {
    alert(`submit = ${inputValue}`);
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
          type={forkState === 'forkAdd' ? 'tick' : 'search'}
          position='left'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
          onClickHandler={
            forkState === 'forkAdd'
              ? () => {
                  submitHandler();
                }
              : searcHandler
          }
          forkState={forkState}
          setInputValue={setInputValue}
        />

        <div className={`fork-line ${screen} ${forkState}`} style={lineStyle}></div>

        <Button
          type={forkState === 'forkSearch' ? 'tick' : 'add'}
          position='right'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
          onClickHandler={
            forkState === 'forkSearch'
              ? () => {
                  submitHandler();
                }
              : addHandler
          }
          forkState={forkState}
          setInputValue={setInputValue}
        />
      </section>
    </>
  );
}

export default Fork;
