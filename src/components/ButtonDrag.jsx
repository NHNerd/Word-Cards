import { useContext } from 'react';

import './ButtonDrag.css';

import { AppContext } from '../App';

function ButtonDrag({ rotate }) {
  const { menuLOLTransition } = useContext(AppContext);
  function styleHandler(rotate, menuLOLTransition) {
    let transform = false;
    let opacity = 0.2;

    if (rotate === 'top') {
      transform = `translate(-50%, -30px) scale(${1.4 - menuLOLTransition})`;
    } else if (rotate === 'left') {
      transform = `translate(-50px, -50%) rotate(-90deg)  scale(${1 - menuLOLTransition * 0.5})`;
    } else if (rotate === 'right') {
      transform = `translate(50px, -50%) rotate(90deg)  scale(${1 - menuLOLTransition * 0.5})`;
    }
    opacity = (1 - menuLOLTransition) * 0.2;

    return {
      transform,
      opacity,
    };
  }

  return (
    <>
      <button
        id='ButtonDrag'
        className={`ButtonDrag-${rotate}`}
        style={styleHandler(rotate, menuLOLTransition)}
      />
    </>
  );
}

export default ButtonDrag;
