import './ButtonDrag.css';

function ButtonDrag({ rotate, menuLOLTransition }) {
  function getStyleForRotateClass(rotate, menuLOLTransition) {
    let transform = false;
    let opacity = '0.2';

    if (rotate === 'top') {
      transform = `rotate(0deg) translate(-50%, -20px) scale(${1.4 - menuLOLTransition})`;
    } else if (rotate === 'left') {
      transform = `translate(-60px, 0) rotate(-90deg)  scale(${1 - menuLOLTransition * 0.5})`;
    } else if (rotate === 'right') {
      transform = `translate(60px, 0) rotate(90deg)  scale(${1 - menuLOLTransition * 0.5})`;
    }
    opacity = `${(1 - menuLOLTransition) * 0.2}`;

    return {
      transform,
      opacity,
    };
  }

  return (
    <>
      <div
        className={`ButtonDrag ButtonDrag-${rotate}`}
        style={getStyleForRotateClass(rotate, menuLOLTransition)}
      >
        <div className='xyu'></div>
      </div>
    </>
  );
}

export default ButtonDrag;
