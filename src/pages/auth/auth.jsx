import React from 'react';

import Button from '../../components/Button.jsx';
// import Alert from '../../components/Alert.jsx';
import { registrationHandler, loginHandler } from '../../data/auth.js';
import { validateEmail, passwordValidation } from '../../handlers/mailValidation.js';
import './Auth.css';

import { AppContext } from '../../App.jsx';

function preDefHandle(e) {
  e.preventDefault();
}

function Auth() {
  const containeerAuthMailRef = React.useRef();

  const { setIsLoading, setIsAuth } = React.useContext(AppContext);

  const [sign, setSign] = React.useState('in');
  const [eye, setEye] = React.useState({ password: false, confirm: false });
  const [inputMail, setInputMail] = React.useState({ value: '', status: 'none' });
  const [inputPassword, setInputPassword] = React.useState({ value: '', status: 'none' });
  const [inputConfirm, setInputConfirm] = React.useState({ value: '', status: 'none' });
  const [inputFocused, setInputFocused] = React.useState(false);

  const isUserRegistr = true;

  function inputFocusedHandler(inputName) {
    switch (inputName) {
      case 'mail':
        setInputFocused('mail');
        break;
      case 'password':
        setInputFocused('password');
        break;
      case 'confirm-password':
        setInputFocused('confirm-password');
        break;
      default:
        setInputFocused('none');
        break;
    }
  }

  function mailOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputMail({ value: value, status: 'none' });
    } else if (validateEmail(value)) {
      setInputMail({ value: value, status: 'ok' });
    } else {
      setInputMail({ value: value, status: 'issue' });
    }
  }

  //TODO add password validation
  function passwordOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputPassword({ value: value, status: 'none' });
    } else if (passwordValidation(value)) {
      setInputPassword({ value: value, status: 'ok' });
    } else {
      setInputPassword({ value: value, status: 'issue' });
    }

    // Confirm status
    if (inputConfirm.value === '') {
      setInputConfirm({ value: inputConfirm.value, status: 'none' });
    } else if (e.target.value === inputConfirm.value && passwordValidation(value)) {
      setInputConfirm({ value: inputConfirm.value, status: 'ok' });
    } else {
      setInputConfirm({ value: inputConfirm.value, status: 'issue' });
    }
  }
  function confirmOkHandler(e) {
    const value = e.target.value;
    if (value === '') {
      setInputConfirm({ value: value, status: 'none' });
    } else if (e.target.value === inputPassword.value && passwordValidation(value)) {
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

  function submitHandler(e) {
    e.preventDefault();
    // if inputs incoorect marks invalid input
    if (inputMail.status != 'ok') {
      setInputFocused('mail');
    } else if (inputPassword.status != 'ok') {
      setInputFocused('password');
    } else if (inputConfirm.status != 'ok') {
      setInputFocused('confirm-password');
    }

    // Check log-in validation
    if (inputPassword.status === 'ok' && inputMail.status === 'ok') {
      const userInput = {
        email: inputMail.value,
        password: inputPassword.value,
      };

      // check current page
      if (sign === 'in') {
        setIsLoading(true);
        loginHandler(userInput).then((data) => {
          if (data.success) {
            setIsAuth(true);
            console.log('S U C C E S S');
          } else {
            setIsAuth(false);
            console.log('F A I L');
          }
          setIsLoading(false);
        });

        // Check log-up validation
      } else if (sign === 'up' && inputConfirm.status === 'ok') {
        setIsLoading(true);
        registrationHandler(userInput).then((data) => {
          if (data.success) {
            setIsAuth(true);
            console.log('S U C C E S S');
          } else {
            setIsAuth(false);
            console.log('F A I L');
          }
          setIsLoading(false);
        });
      }
    }
  }

  return (
    <>
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
              <div id='containeer-auth-mail' ref={containeerAuthMailRef}>
                <div id='input-mail-status' className={inputMail.status}></div>
                <input
                  id='auth-input-mail'
                  type='text'
                  placeholder='enter mail'
                  value={inputMail.value} // ? Must have?
                  required
                  onChange={mailOkHandler}
                  onFocus={() => inputFocusedHandler('mail')}
                  onBlur={() => inputFocusedHandler('none')}
                  //! Dont work
                  autoComplete='email'
                ></input>
                <div
                  className={`auth-validation-alert ${
                    inputFocused === 'mail' ? inputMail.status : null
                  }`}
                >
                  incorrect email address
                </div>
              </div>

              <div id='containeer-auth-password'>
                <div id='input-password-status' className={inputPassword.status}></div>
                <input
                  id='auth-input-password'
                  type={eye.password ? 'text' : 'password'}
                  placeholder='enter password'
                  value={inputPassword.value} // ? Must have?
                  maxLength={16}
                  required
                  onChange={passwordOkHandler}
                  onFocus={() => inputFocusedHandler('password')}
                  onBlur={() => inputFocusedHandler('none')}
                  //! Dont work
                  autoComplete='password'
                ></input>

                <div
                  className={`auth-validation-alert ${
                    inputFocused === 'password' ? inputPassword.status : null
                  }`}
                >
                  length 8-24 symbols
                  <br />
                  letters: a-z A-Z *<br />
                  numbers: 0-9
                </div>

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
                  onFocus={() => inputFocusedHandler('confirm-password')}
                  onBlur={() => inputFocusedHandler('none')}
                ></input>
                <div
                  className={`auth-validation-alert ${
                    inputFocused === 'confirm-password' ? inputConfirm.status : null
                  }`}
                  // className={`auth-validation-alert ${inputConfirm.status}`}
                >
                  {inputPassword.status === 'ok'
                    ? 'password mismatch!'
                    : 'Before input correct password!'}
                </div>
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
            <button
              id='auth-sign-in-botton'
              className='auth-button'
              type='submit'
              onClick={submitHandler}
            >
              <div className='bg-left'></div>
              <div id='auth-submit'>sign-in</div>
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
