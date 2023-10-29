import React from 'react';
import StrokeElement from '../../components/StrokeElement.jsx';
import { replaceListFetch } from '../../data/content-management.js';
import arrayEqual from '../../handlers/arrayEqual.js';

import './ListEditing.css';

let LOLOrderOld = 0;
// let visibility = false;

function ListEditing({
  setStrokeElementHeight,
  lists,
  setLists,
  LOLOrder,
  oldLists,
  screen,
  changeScreen,
  screenFromTo,
  containerSize,
}) {
  //TODO add into system S T A R T
  const words = [
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'pineapple',
      translate: 'ананас',
      correctAnswers: 20,
      gameCount: 27,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'pomegranate',
      translate: 'гранат',
      correctAnswers: 14,
      gameCount: 30,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'dates',
      translate: 'финики',
      correctAnswers: 14,
      gameCount: 15,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'figs',
      translate: 'инжир',
      correctAnswers: 8,
      gameCount: 15,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'apple',
      translate: 'Яблоко',
      correctAnswers: 17,
      gameCount: 26,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'grape',
      translate: 'виноград',
      correctAnswers: 31,
      gameCount: 34,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'plum',
      translate: 'слива',
      correctAnswers: 1,
      gameCount: 1,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'melon',
      translate: 'дыня',
      correctAnswers: 1,
      gameCount: 3,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'apircot',
      translate: 'абриков',
      correctAnswers: 42,
      gameCount: 170,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'banana',
      translate: 'банан',
      correctAnswers: 2,
      gameCount: 4,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'coconut',
      translate: 'кокос',
      correctAnswers: 1,
      gameCount: 12,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'lychee',
      translate: 'личи',
      correctAnswers: 4,
      gameCount: 5,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'passion fruit',
      translate: 'маракуйя',
      correctAnswers: 4,
      gameCount: 6,
    },
    {
      userId: '65244f787604ab078d15c26d',
      listId: '652e778c51a614782761f191',
      word: 'feijoa',
      translate: 'фейхоа',
      correctAnswers: 14,
      gameCount: 19,
    },
  ];

  // ratio handler
  function ratioListEditing(a, b) {
    const ratioA = a.correctAnswers / a.gameCount;
    const ratioB = b.correctAnswers / b.gameCount;
    return ratioA - ratioB;
  }
  // sort
  words.sort(ratioListEditing);
  //TODO add into system E N D

  React.useEffect(() => {
    // froward
    if (LOLOrder < LOLOrderOld) {
      console.log('FORWARD');
      //? For rerender component after state changing.
      //? react compare link(variable), not link value!
      //? Becose must need use in set(newVarable)
      const newLists = [...lists];
      const removedList = newLists.shift();
      newLists.push(removedList);
      newLists.map((element, index) => {
        element.order = index;
      });
      setLists(newLists);

      LOLOrderOld = LOLOrder;
      // bakward
    } else if (LOLOrder > LOLOrderOld) {
      console.log('BACWARD');
      const newLists = [...lists];
      const removedList = newLists.pop();
      newLists.unshift(removedList);
      newLists.map((element, index) => {
        element.order = index;
      });
      setLists(newLists);
      LOLOrderOld = LOLOrder;
    }
  }, [LOLOrder]);

  // set lists in localStorage
  React.useEffect(() => {
    // localStorage refreshing only here!
    if (!arrayEqual(oldLists, lists, 'listName')) {
      localStorage.setItem('lists', JSON.stringify(lists));
    }
  }, [lists]);

  //TODO изучить как эта конструкция работает
  // sent Fetch when user reload or close page!
  React.useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ''; // Это сообщение может быть отображено пользователю

      const newLists = JSON.parse(localStorage.getItem('lists'));
      // FETCH
      if (newLists != '') replaceListFetch(newLists);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  function backToLOL() {
    changeScreen('ListOfList');
  }

  const [visibility, setVisibility] = React.useState('hidden');
  if (screenFromTo === 'ListEditing>>>ListOfList') {
    setTimeout(() => {
      setVisibility('hidden');
    }, 500);
  } else if (screenFromTo === 'ListOfList>>>ListEditing') {
    setTimeout(() => {
      setVisibility('visible');
    }, 1);
  }

  if (!words) {
    return (
      <>
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          parrentType={'ListEditing'}
          textH1={'apple'}
          line={false} //? remove for last element
          order={0}
          axis={'vertical'}
        />
      </>
    );
  }

  //WORKAROUND same shit in the Draggable
  const marginTop = Math.round(containerSize.y * 0.16);

  return (
    <>
      <div id='listEditin-button' className='button-jitter' onClick={backToLOL}></div>

      <section
        id='container-listEditin'
        style={{ visibility: visibility, paddingTop: `${marginTop}px` }}
      >
        {words.map((object, index) => (
          <StrokeElement
            setStrokeElementHeight={setStrokeElementHeight}
            parrentType={'ListEditing'}
            key={index} //? unique react component(need for React)
            textH1={object.word}
            progressBar={`${(object.correctAnswers / object.gameCount) * 100}%`}
            line={index === words.length - 1 ? false : true} //? remove for last element
            order={index}
            axis={'vertical'}
          >
            {/* <div id='container-wordProgressBar'>
              <div
                id='wordProgressBar'
                style={{ width: `${(object.correctAnswers / object.gameCount) * 100}%` }}
              ></div>
            </div> */}
          </StrokeElement>
        ))}
      </section>
    </>
  );
}

const MemoizedListEditing = React.memo(ListEditing);
export default MemoizedListEditing;
//
