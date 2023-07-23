import StrokeElement from '../../components/StrokeElement.jsx';

function ListOfList() {
  return (
    <>
      <div className='za'></div>
      <StrokeElement
        h1={'list #1'}
        textH2={'word count: '}
        countH2={'119'}
        textH3={'game count: '}
        countH3={'38'}
      />
      <StrokeElement h1={'list #2'} />
      <StrokeElement h1={'list #3'} />
      <StrokeElement h1={'list #4'} />
      <StrokeElement h1={'list #5'} />
      <StrokeElement h1={'list #6'} />
    </>
  );
}

export default ListOfList;
