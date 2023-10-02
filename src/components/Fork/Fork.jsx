import React from 'react';
import Button from '../Button.jsx';
import SettingFork from './components/SettingFork.jsx';

import { AppContext } from '../../App.jsx';

import './Fork.css';

function Fork({ parrentTypeSettings }) {
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
      {parrentTypeSettings ? null : <div className={`fork-bg-header ${screen}`}></div>}

      {forkState != 'forkNon' ? (
        <div id={parrentTypeSettings ? '' : 'fork-bg-lol'} onClick={() => forkNonHandler()}></div>
      ) : null}

      <section
        id='fork'
        className={`${parrentTypeSettings ? 'fork-Settings' : 'fork-' + screen}`}
        style={parrentTypeSettings != 'Settings' ? { top: `${marginTop}px` } : {}}
      >
        <Button
          text={parrentTypeSettings ? 'Contacts' : ''}
          type={parrentTypeSettings ? 'contacts' : forkState === 'forkAdd' ? 'tick' : 'search'}
          position='left'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          parrentTypeSettings={parrentTypeSettings}
          containerSize={containerSize}
          ButtonOnClickHandler={
            parrentTypeSettings
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
          {parrentTypeSettings ? (
            <SettingFork buttonType={'Contacts'} isContactsOpen={isContactsOpen} />
          ) : null}
        </Button>

        <div
          className={
            parrentTypeSettings ? `fork-line ${parrentTypeSettings}` : `fork-line ${screen} ${forkState}`
          }
          style={lineStyle}
        ></div>

        <Button
          text={parrentTypeSettings ? 'Donate' : ''}
          type={parrentTypeSettings ? 'donate' : forkState === 'forkSearch' ? 'tick' : 'add'}
          position='right'
          menuLOLTransition={menuLOLTransition}
          parrentType={'Fork'}
          parrentTypeSettings={parrentTypeSettings}
          containerSize={containerSize}
          ButtonOnClickHandler={
            parrentTypeSettings
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
          {parrentTypeSettings ? (
            <SettingFork buttonType={'Donate'} isDonateOpen={isDonateOpen} />
          ) : null}
        </Button>
      </section>
    </>
  );
}

const MemoizedFork = React.memo(Fork);
export default MemoizedFork;
