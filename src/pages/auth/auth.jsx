import StrokeElement from '../../components/StrokeElement.jsx';
import Button from '../../components/Button.jsx';
import './Auth.css';

function Auth() {
  const isUserRegistr = true;
  return (
    <>
      {isUserRegistr ? (
        <div className='sign-in'>
          <div className='header'>sign-in</div>
          <StrokeElement text={'e-mail'} />
          <StrokeElement text={'password'} />
          <Button text={'sign-in'} />
          <Button text={'create an account'} />
        </div>
      ) : (
        <div className='sign-up'>
          <div className='header'>sign-up</div>
          <StrokeElement text={'e-mail'} />
          <StrokeElement text={'password'} />
          <StrokeElement text={'confirm-password'} />
          <Button text={'sign-up'} />
        </div>
      )}

      {/* <div className='forgot'>
        <StrokeElement text={'e-mail'} />
      </div> */}
    </>
  );
}

export default Auth;
