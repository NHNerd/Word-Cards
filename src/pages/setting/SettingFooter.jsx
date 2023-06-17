import { useState } from 'react';

import './SettingFooter.css';

function SettingFooter() {
  // Contacts
  const [contacts, setContacts] = useState(false);
  const changeContacts = () => {
    setContacts(!contacts);
  };

  return (
    <>
      <div className='settingFooter'>
        <div onClick={changeContacts} className='contacts'>
          Contacts
          <div className='instagram'></div>
          <div className='gmail'></div>
        </div>
        <div className='donate'>
          Donate
          <div className='gPay'></div>
        </div>
      </div>
    </>
  );
}

export default SettingFooter;
