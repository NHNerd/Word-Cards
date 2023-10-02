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
            <div id='instagram' onClick={instagramHandler} role='button'></div>
            <div id='gmail' onClick={gmailHandler} role='button'></div>
            <div id='telegram' onClick={telegramHandler} role='button'></div>
          </div>
        ) : (
          <div className={`setting-fork-donate-all ${isDonateOpen ? 'on' : 'off'} `}>
            <div id='patreon' role='button'></div>
            <div id='googlePay' role='button'></div>
            <div id='coFi' role='button'></div>
            <div id='payPal' role='button'></div>
          </div>
        )}
      </div>
    </>
  );
}

//TODO memo is don't work. Why?
export default SettingFork;
