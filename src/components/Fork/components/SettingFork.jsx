import React from 'react';

import './SettingFork.css';

function SettingFork({ buttonType, isContactsOpen, isDonateOpen }) {
  function instagramHandler() {
    window.open('https://www.instagram.com/northern_head/', '_blank');
  }

  function gmailHandler() {
    window.open('https://mailto:promenader.off@gmail.com', '_blank');
  }

  function telegramHandler() {
    window.open('https://t.me/+fPxCijU8HPQ4YTZi', '_blank');
  }
  return (
    <>
      <div className='container-setting-fork-inner'>
        {buttonType === 'Contacts' ? (
          <div className={`setting-fork-contacts-all ${isContactsOpen ? 'on' : 'off'} `}>
            <div
              id='instagram'
              className='circle-button-hover'
              onClick={instagramHandler}
              role='button'
            ></div>
            <div id='gmail' className='circle-button-hover' onClick={gmailHandler} role='button'></div>
            <div
              id='telegram'
              className='circle-button-hover'
              onClick={telegramHandler}
              role='button'
            ></div>
          </div>
        ) : (
          <div className={`setting-fork-donate-all ${isDonateOpen ? 'on' : 'off'} `}>
            <div id='patreon' className='circle-button-hover' role='button'></div>
            <div id='googlePay' className='circle-button-hover' role='button'></div>
            <div id='coFi' className='circle-button-hover' role='button'></div>
            <div id='payPal' className='circle-button-hover' role='button'></div>
          </div>
        )}
      </div>
    </>
  );
}

//TODO memo is don't work. Why?
export default SettingFork;
