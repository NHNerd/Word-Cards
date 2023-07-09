import { useState } from 'react';

import SettingMain from './SettingMain.jsx';
import SettingFooter from './SettingFooter.jsx';
import Auth from '../auth/auth.jsx';

import './Settings.css';

function Settings() {
  // const [open, setOpen] = useState('Menu');
  const [isSync, setSync] = useState(false);
  const cahngeSync = () => {
    setSync(!isSync);
  };
  return (
    <>
      {/* Settings all */}
      <div className='setting-popup'>
        <div className={isSync ? 'settings-container ' : 'settings-container settings-active '}>
          <div className='headerSetting'>About</div>
          <div className='mainSetting'>
            <SettingMain isSync={isSync} cahngeSync={cahngeSync} />
          </div>
          <div className='footerSetting'>
            <SettingFooter />
          </div>
        </div>

        {/* Auth */}
        <div className={!isSync ? 'auth-form' : 'auth-form settings-active '}>
          <Auth />
        </div>
      </div>
    </>
  );
}

export default Settings;
