import React from 'react';
import Button from '../Button.jsx';
import SettingFork from './components/SettingFork.jsx';

import { AppContext } from '../../App.jsx';

import './Fork.css';

function Fork({ parrentType }) {
  console.log('F O R K');
  const {
    screen,
    containerSize,
    menuLOLTransition,
    setIsContactsOpen,
    setIsDonateOpen,
    isContactsOpen,
    isDonateOpen,
  } = React.useContext(AppContext);

  const [forkState, setForkState] = React.useState('forkNon');
  const [inputValue, setInputValue] = React.useState('');

  const marginTop = containerSize.y * 0.04;
  const lineStyle = {};

  //* LOL screen
  function searchHandler() {
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

  //* Settings screen
  function contactsHandler() {
    setIsContactsOpen(!isContactsOpen);
    setForkState('forkContacts');
  }
  function donateHandler() {
    setIsDonateOpen(!isDonateOpen);
    setForkState('forkDonate');
  }

  return (
    <>
      {parrentType === 'Settings' ? null : <div className={`fork-bg-header ${screen}`}></div>}

      {forkState != 'forkNon' ? (
        <div id={parrentType === 'Settings' ? '' : 'fork-bg-lol'} onClick={() => forkNonHandler()}></div>
      ) : null}

      <section
        id='fork'
        className={`${parrentType === 'Settings' ? 'fork-Settings' : 'fork-' + screen}`}
        style={parrentType != 'Settings' ? { top: `${marginTop}px` } : {}}
      >
        <Button
          text={parrentType === 'Settings' ? 'Contacts' : ''}
          type={parrentType === 'Settings' ? 'contacts' : forkState === 'forkAdd' ? 'tick' : 'search'}
          position='left'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
          onClickHandler={
            parrentType === 'Settings'
              ? contactsHandler
              : forkState === 'forkAdd'
              ? () => {
                  submitHandler();
                }
              : searchHandler
          }
          forkState={forkState}
          setInputValue={setInputValue}
        >
          {parrentType === 'Settings' ? (
            <SettingFork buttonType={'Contacts'} isContactsOpen={isContactsOpen} />
          ) : null}
        </Button>
        <div
          className={
            parrentType === 'Settings' ? `fork-line ${parrentType}` : `fork-line ${screen} ${forkState}`
          }
          style={lineStyle}
        ></div>

        <Button
          text={parrentType === 'Settings' ? 'Donate' : ''}
          type={parrentType === 'Settings' ? 'donate' : forkState === 'forkSearch' ? 'tick' : 'add'}
          position='right'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          containerSize={containerSize}
          onClickHandler={
            parrentType === 'Settings'
              ? donateHandler
              : forkState === 'forkSearch'
              ? () => {
                  submitHandler();
                }
              : addHandler
          }
          forkState={forkState}
          setInputValue={setInputValue}
        >
          {parrentType === 'Settings' ? (
            <SettingFork buttonType={'Donate'} isDonateOpen={isDonateOpen} />
          ) : null}
        </Button>
      </section>
    </>
  );
}

const MemoizedFork = React.memo(Fork);
export default MemoizedFork;
