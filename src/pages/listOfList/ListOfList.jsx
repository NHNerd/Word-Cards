import React from 'react';
import StrokeElement from '../../components/StrokeElement.jsx';

import data from '../../../public/data/data.json';

function ListOfList({ setStrokeElementHeight }) {
  // const listOfListKeys = Object.keys(data.listOfList);
  const listOfListKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const startIdx = 1; // Указываем начальный индекс

  return (
    <>
      {/* horizontal */}

      {/* left */}

      {/* {listOfListKeys.slice(startIdx, 12).map((key, index) => (
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          key={key} // Используем ключ в качестве уникального идентификатора (id)
          id={key} // Прокидываем ключ как id для StrokeElement
          textH1={listOfListKeys[index + startIdx]}
          textH2={'word count'}
          countH2={Object.keys(data.listOfList[key].words).length}
          textH3={'game count'}
          countH3={data.listOfList[key]['game count']}
          line={listOfListKeys.length - 1 > index + startIdx ? true : false}
          isButtonDrag={false}
          order={index}
          axis={'horizontal'}
          pos={'left'}
        />
      ))} */}

      {/* right */}

      {/* {listOfListKeys.slice(startIdx, 12).map((key, index) => (
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          key={key} // Используем ключ в качестве уникального идентификатора (id)
          id={key} // Прокидываем ключ как id для StrokeElement
          textH1={listOfListKeys[index + startIdx]}
          textH2={'word count'}
          countH2={Object.keys(data.listOfList[key].words).length}
          textH3={'game count'}
          countH3={data.listOfList[key]['game count']}
          line={listOfListKeys.length - 1 > index + startIdx ? true : false}
          isButtonDrag={false}
          order={index}
          axis={'horizontal'}
          pos={'right'}
        />
      ))} */}

      {/* vertical */}
      {listOfListKeys.map((key, index) => (
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          parrentType={'ListOfList'}
          key={key} // Используем ключ в качестве уникального идентификатора (id)
          id={key} // Прокидываем ключ как id для StrokeElement
          textH1={listOfListKeys[index]}
          textH2={'word count'}
          // countH2={Object.keys(data.listOfList[key].words).length}
          countH2={1}
          textH3={'game count'}
          // countH3={data.listOfList[key]['game count']}
          countH3={1}
          line={listOfListKeys.length - 1 > index ? true : false}
          isButtonDrag={true}
          order={index}
          axis={'vertical'}
        />
      ))}
    </>
  );
}

const MemoizedListOfList = React.memo(ListOfList);
export default MemoizedListOfList;
