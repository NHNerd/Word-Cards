import { useState } from 'react';

import './SettingMain.css';

function SettingMain() {
  // Contacts
  const [synchronization, setSynchronization] = useState(false);
  const cahngeSynchronization = () => {
    setSynchronization(!synchronization);
  };

  return (
    <>
      <div className='settingMain'>
        <div className='synchronization settingMain-element'>
          <div className='check-box'>
            <div className='box'>
              <div className='tick'></div>
            </div>
          </div>
          <div onClick={cahngeSynchronization} className='synchronizationButton'>
            synchronization
          </div>
          <div className='faq'></div>
        </div>
        <div className='line'></div>

        <div className='sound settingMain-element'>
          <div className='check-box'>
            <div className='box'>
              <div className='tick'></div>
            </div>
          </div>
          <div className='soun-button'>sound</div>
          <div className='faq'></div>
        </div>
        <div className='line'></div>

        <div className='notification settingMain-element'>
          <div className='check-box'>
            <div className='box'>
              <div className='tick'></div>
            </div>
          </div>
          <div className='soun-button'>notification</div>
          <div className='faq'></div>
        </div>
        <div className='line'></div>
      </div>
    </>
  );
}

export default SettingMain;
