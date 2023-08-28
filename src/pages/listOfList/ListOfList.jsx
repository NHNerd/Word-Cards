import { useContext, useState, useEffect } from 'react';
import StrokeElement from '../../components/StrokeElement.jsx';
import { ScreenContext } from '../../App.jsx';
import data from '../../../public/data/data.json';

function ListOfList({ setStrokeElementHeight, menuLOLTransition }) {
  const [screen, changeScreen] = useContext(ScreenContext);
  const listOfListKeys = Object.keys(data.listOfList);

  return (
    <>
      {listOfListKeys.map((key, index) => (
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          menuLOLTransition={menuLOLTransition}
          key={key} // Используем ключ в качестве уникального идентификатора (id)
          id={key} // Прокидываем ключ как id для StrokeElement
          textH1={listOfListKeys[index]}
          textH2={'word count'}
          countH2={Object.keys(data.listOfList[key].words).length}
          textH3={'game count'}
          countH3={data.listOfList[key]['game count']}
          line={listOfListKeys.length - 1 > index ? true : false}
          isButtonDrag={false}
          isFirstElement={0 === index ? true : false}
        />
      ))}
    </>
  );
}

export default ListOfList;
