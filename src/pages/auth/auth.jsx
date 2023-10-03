import React from 'react';

import Button from '../../components/Button.jsx';
import './Auth.css';

import { AppContext } from '../../App.jsx';

function preDefHandle(e) {
  e.preventDefault();
}

function Auth() {
  const { setAuthOpen } = React.useContext(AppContext);

  const [sign, setSign] = React.useState('in');
  const [eye, setEye] = React.useState({ password: false, confirm: false });
  const [inputMail, setInputMail] = React.useState({ value: '', status: 'none' });
  const [inputPassword, setInputPassword] = React.useState({ value: '', status: 'none' });
  const [inputConfirm, setInputConfirm] = React.useState({ value: '', status: 'none' });

  const isUserRegistr = true;

  function authBack() {
    setAuthOpen(false);
  }

  //TODO if for correct mail
  function mailOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputMail({ value: value, status: 'none' });
    } else if (true) {
      setInputMail({ value: value, status: 'ok' });
    } else {
      setInputMail({ value: value, status: 'issue' });
    }
  }
  function passwordOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputPassword({ value: value, status: 'none' });
    } else if (value.length >= 4) {
      setInputPassword({ value: value, status: 'ok' });

      // Confirm
      if (e.target.value === inputConfirm.value) {
        setInputConfirm({ value: value, status: 'ok' });
      }
    } else {
      setInputPassword({ value: value, status: 'issue' });
    }
  }
  function confirmOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputConfirm({ value: value, status: 'none' });
    } else if (e.target.value === inputPassword.value && value.length >= 4) {
      setInputConfirm({ value: value, status: 'ok' });
    } else {
      setInputConfirm({ value: value, status: 'issue' });
    }
  }

  function eyePasswordHandle(e) {
    e.preventDefault();
    setEye({ password: !eye.password, confirm: eye.confirm });
  }
  function eyeComfirmHandle(e) {
    e.preventDefault();
    setEye({ password: eye.password, confirm: !eye.confirm });
  }

  function signInHandler() {
    setSign('in');
  }
  function signUpHandler() {
    setSign('up');
  }
  return (
    <>
      <button
        id='page-setting-back-container'
        className='button-jitter'
        onClick={authBack}
        role='button'
      >
        <div id='page-setting-back-element'></div>
      </button>

      {isUserRegistr ? (
        <form id='sign'>
          {/* H E A D E R  */}
          <div id='sign-header' onClick={preDefHandle}>
            <div id='sign-header-fork'>
              <button
                id='sign-in-header-text'
                className={sign === 'in' ? 'on' : null}
                onClick={signInHandler}
              >
                sign-in
              </button>
              <div id='sign-header-fork-line' className={sign === 'in' ? 'in' : 'up'}></div>
              <button
                id='sign-up-header-text'
                className={sign === 'up' ? 'on' : null}
                onClick={signUpHandler}
              >
                sign-up
              </button>
            </div>
          </div>

          {/* M A I N   */}
          <div id='sign-main'>
            <div id='sign-in-main-inner'>
              <div id='containeer-auth-mail'>
                <div id='input-mail-status' className={inputMail.status}></div>
                <input
                  id='auth-input-mail'
                  type='text'
                  placeholder='enter mail'
                  required
                  onChange={mailOkHandler}
                ></input>
              </div>

              <div id='containeer-auth-password'>
                <div id='input-password-status' className={inputPassword.status}></div>
                <input
                  id='auth-input-password'
                  type={eye.password ? 'text' : 'password'}
                  placeholder='enter password'
                  maxLength={16}
                  required
                  onChange={passwordOkHandler}
                ></input>
                <button
                  className={eye.password ? 'eye' : 'eye-hide'}
                  onClick={eyePasswordHandle}
                ></button>
              </div>

              <div id='containeer-auth-password-confirm' className={sign === 'in' ? 'off' : 'on'}>
                <div id='input-password-confirm-status' className={inputConfirm.status}></div>
                <button className={eye.confirm ? 'eye' : 'eye-hide'} onClick={eyeComfirmHandle}></button>
                <input
                  id='auth-input-password-confirm'
                  type={eye.confirm ? 'text' : 'password'}
                  placeholder='confirm password'
                  maxLength={16}
                  required
                  onChange={confirmOkHandler}
                ></input>
              </div>

              <div id='sign-in-main-addirioanl'>
                <div id='container-remember'>
                  <input id='auth-remember' type='checkbox' name='auth-remember'></input>
                  <label htmlFor='auth-remember'> remember me</label>
                </div>
                <button id='forgot-open-button' type='buttom' onClick={preDefHandle}>
                  forgot password?
                </button>
              </div>
            </div>
          </div>

          {/* F O O T E R */}
          <div id='sign-footer'>
            <button id='auth-sign-in-botton' className='auth-button' type='submit'>
              <div className='bg-left'></div>
              <div> sign-in </div>
              <div className='bg-right'></div>
            </button>
            <div id='container-or-split'>
              <div id='auth-sign-or-line-left'></div>
              <div id='auth-sign-or-text'>or</div>
              <div id='auth-sign-or-line-right'></div>
            </div>
            <div id='conteiner-auth-sign-or' onClick={preDefHandle}>
              <button id='auth-sign-github' className='circle-button-hover' type='buttom'></button>
              <button id='auth-sign-google' className='circle-button-hover' type='buttom'></button>
            </div>
          </div>
        </form>
      ) : (
        <section id='sign-up'>
          <div className='header'>sign-up</div>
          {/* <StrokeElement text={'e-mail'} />
          <StrokeElement text={'password'} />
          <StrokeElement text={'confirm-password'} /> */}
          <Button text={'sign-up'} />
        </section>
      )}

      {/* <div className='forgot'>
        <StrokeElement text={'e-mail'} />
      </div> */}
    </>
  );
}

export default Auth;
