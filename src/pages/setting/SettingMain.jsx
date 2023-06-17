import { useState } from 'react';

import './SettingFooter.css';

function SettingMain() {
  // Contacts
  const [synchronization, setSynchronization] = useState(false);
  const cahngeSynchronization = () => {
    setSynchronization(!synchronization);
  };

  return (
    <>
      <div className='settingMain'>
        <div onClick={cahngeSynchronization} className='synchronization'>
          synchronization
        </div>
        <div className='sound'></div>
      </div>
    </>
  );
}

export default SettingMain;
