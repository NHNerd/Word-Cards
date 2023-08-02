import StrokeElement from '../../components/StrokeElement.jsx';

import data from '../../../public/data/data.json';

function MainListOfList() {
  const listOfListKeys = Object.keys(data.listOfList);

  console.log(listOfListKeys.length);
  return (
    <>
      {listOfListKeys.map((key, index) => (
        <StrokeElement
          key={key} // Используем ключ в качестве уникального идентификатора (id)
          id={key} // Прокидываем ключ как id для StrokeElement
          textH1={listOfListKeys[index]}
          textH2={'word count'}
          countH2={Object.keys(data.listOfList[key].words).length}
          textH3={'game count'}
          countH3={data.listOfList[key]['game count']}
          line={true}
          isButtonDrag={false}
        />
      ))}
    </>
  );
}

export default MainListOfList;
