import StrokeElement from '../../components/StrokeElement.jsx';
import Button from '../../components/Button.jsx';
import './Auth.css';

function Auth() {
  const isUserRegistr = false;
  return (
    <>
      {isUserRegistr ? (
        <div className='sign-in'>
          <div className='header'>sign-in</div>
          <StrokeElement text={'e-mail'} />
          <StrokeElement text={'password'} />
          <Button />
        </div>
      ) : (
        <div className='sign-up'>
          <div className='header'>sign-up</div>
          <StrokeElement text={'e-mail'} />
          <StrokeElement text={'password'} />
          <StrokeElement text={'confirm-password'} />
          <Button />
        </div>
      )}

      {/* <div className='forgot'>
        <StrokeElement text={'e-mail'} />
      </div> */}
    </>
  );
}

export default Auth;
