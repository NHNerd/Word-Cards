import './AuthLogin.css';

function AuthLogin({ onClick }) {
  return (
    <>
      <div onClick={onClick} className='authLogin'>
        <div className='header'>Sign up</div>
        <div className='e-mail'></div>
        <div className='password'></div>
        <div className='submit'></div>
        <div className='forgot'></div>
      </div>
    </>
  );
}

export default AuthLogin;
