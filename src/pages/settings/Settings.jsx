import React from 'react';
import Fork from '../../components/Fork/Fork';
import StrokeElement from '../../components/StrokeElement';
import Auth from '../auth/auth';

import { AppContext } from '../../App.jsx';

import './Settings.css';
console.log('S E T T I N G S');
function Settings({ setStrokeElementHeight, setSettingOpen }) {
  const {
    settingOpen,
    setIsContactsOpen,
    setIsDonateOpen,
    isContactsOpen,
    isDonateOpen,
    authOpen,
    setAuthOpen,
  } = React.useContext(AppContext);

  const settingsObject = ['synchronization', 'sound', 'notification'];

  const [bgIsOpen, setBgIsOpen] = React.useState('off');

  React.useEffect(() => {
    if (isContactsOpen || isDonateOpen) {
      setBgIsOpen('on');
    } else {
      setBgIsOpen('off');
    }
  }, [isContactsOpen, isDonateOpen]);

  function containerSettingForkBgHandelr() {
    setIsContactsOpen(false);
    setIsDonateOpen(false);
    setBgIsOpen('off');
  }

  function settingOpenHandler() {
    setSettingOpen(!settingOpen);
    setAuthOpen(false);
  }

  return (
    <>
      <div className={`setting-bg-filter ${settingOpen ? 'on' : 'off'}`}></div>
      <div className={`setting-bg-color ${settingOpen ? 'on' : 'off'}`}></div>
      <button
        id='button-page-settings'
        onClick={settingOpenHandler}
        style={settingOpen ? { scale: '0', opacity: 0 } : null}
      ></button>
      <section id='page-settings' className={`page-settings ${settingOpen ? 'on' : ''}`}>
        {/* exit */}
        <button
          id='page-setting-exit-container'
          className='button-jitter'
          onClick={settingOpenHandler}
          role='button'
        >
          <div id='page-setting-exit-element'></div>
        </button>
        <section id='page-settings-inner' className={authOpen ? 'off' : 'on'}>
          <header id='setting-header' className={isContactsOpen || isDonateOpen ? 'blur' : null}>
            <div id='about-bg'>
              text text text <br /> text text
              <br /> text text text
            </div>
            <button id='about' role='button'>
              A B O U T
            </button>
          </header>
          <main id='setting-main' className={isContactsOpen || isDonateOpen ? 'blur' : null}>
            {settingsObject.map((key, index) => (
              <StrokeElement
                setStrokeElementHeight={setStrokeElementHeight}
                parrentTypeSettings={'Settings'}
                key={key} // Используем ключ в качестве уникального идентификатора (id)
                id={index} // Прокидываем ключ как id для StrokeElement
                textH1={settingsObject[index]}
                line={true}
                isButtonDrag={true}
                order={index}
                axis={'vertical'}
              />
            ))}
          </main>

          {/* BG blur */}

          <div
            onClick={containerSettingForkBgHandelr}
            className={'container-setting-fork-inner-bg' + ' ' + bgIsOpen}
          ></div>

          <footer id='setting-footer'>
            <Fork parrentTypeSettings={'Settings'} />
          </footer>
        </section>
        <section id='auth' className={authOpen ? 'on' : 'off'}>
          <Auth setStrokeElementHeight={setStrokeElementHeight} />
        </section>
      </section>
    </>
  );
}

const MemoizedSettings = React.memo(Settings);
export default MemoizedSettings;
