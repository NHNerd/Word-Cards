import React from 'react';

import './SettingFork.css';

function SettingFork({ buttonType, isContactsOpen, isDonateOpen }) {
  return (
    <>
      <div className='container-setting-fork-inner'>
        {buttonType === 'Contacts' ? (
          <div className={`setting-fork-contacts-all ${isContactsOpen ? 'on' : 'off'} `}>
            <div id='instagram'></div>
            <div id='gmail'></div>
            <div id='telegram'></div>
          </div>
        ) : (
          <div className={`setting-fork-donate-all ${isDonateOpen ? 'on' : 'off'} `}>
            <div id='patreon'></div>
            <div id='googlePay'></div>
            <div id='coFi'></div>
            <div id='payPal'></div>
          </div>
        )}
      </div>
    </>
  );
}

//TODO memo is don't work. Why?
export default SettingFork;
