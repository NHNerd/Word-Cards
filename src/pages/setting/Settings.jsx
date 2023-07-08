// import { useStat } from 'react';

import SettingMain from './SettingMain.jsx';
import SettingFooter from './SettingFooter.jsx';

import './Settings.css';

function Settings() {
  // const [open, setOpen] = useState('Menu');

  return (
    <>
      <div className='settings-container'>
        <div className='headerSetting'>About</div>
        <div className='mainSetting'>
          <SettingMain />
        </div>
        <div className='footerSetting'>
          <SettingFooter />
        </div>
      </div>
    </>
  );
}

export default Settings;
