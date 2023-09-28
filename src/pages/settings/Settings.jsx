// import { useContext, useState, useEffect } from 'react';
import React from 'react';
import Fork from '../../components/Fork/Fork';
import StrokeElement from '../../components/StrokeElement';

import { AppContext } from '../../App.jsx';

import './Settings.css';
console.log('S E T T I N G S');
function Settings({ setStrokeElementHeight }) {
  const { settingOpen, setIsContactsOpen, setIsDonateOpen, isContactsOpen, isDonateOpen } =
    React.useContext(AppContext);

  const settingsObject = ['synchronization', 'sound', 'notification'];

  const [bgIsOpen, setBgIsOpen] = React.useState('off');

  React.useEffect(() => {
    if (isContactsOpen || isDonateOpen) {
      setBgIsOpen('on');
    }
  }, [isContactsOpen, isDonateOpen]);

  function containerSettingForkBgHandelr() {
    setIsContactsOpen(false);
    setIsDonateOpen(false);
    setBgIsOpen('off');
  }

  return (
    <>
      <section id='page-settings' className={`page-settings ${settingOpen ? 'on' : ''}`}>
        <div id='setting-bg'></div>

        <section id='page-settings-window'>
          <header id='setting-header'>
            <div id='about-bg'>
              text text text <br /> text text
              <br /> text text text
            </div>
            <div id='about'>A B O U T</div>
          </header>
          <main id='setting-main'>
            {settingsObject.map((key, index) => (
              <StrokeElement
                setStrokeElementHeight={setStrokeElementHeight}
                parrentType={'Settings'}
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
            <Fork parrentType={'Settings'} />
          </footer>
        </section>
      </section>
    </>
  );
}

const MemoizedSettings = React.memo(Settings);
export default MemoizedSettings;
