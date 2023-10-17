import React from 'react';
import StrokeElement from '../../components/StrokeElement.jsx';
import { replaceListFetch } from '../../data/content-management.js';
import arrayEqual from '../../handlers/arrayEqual.js';

let LOLOrderOld = 0;

function ListOfList({ setStrokeElementHeight, lists, setLists, LOLOrder, oldLists, screen }) {
  // if lists = null || undefinde
  // lists = lists || [{ id: 0, listName: 'Froots', order: '1', gameCount: '0' }];

  // Lists: order changing
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
  console.log(screen);
  if (!lists) {
    return (
      <>
        {/* vertical */}
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          parrentType={'ListOfList'}
          textH1={'Froots'}
          //TODO
          textH2={'word count'}
          // countH2={Object.keys(data.listOfList[key].words).length}
          countH2={6}
          textH3={'game count'}
          // countH3={data.listOfList[key]['game count']}
          countH3={0}
          // line={JSON.parse(lists).length - 1 > index ? true : false}
          isButtonDrag={true}
          order={0}
          axis={'vertical'}
        />
      </>
    );
  }
  return (
    <>
      {/* horizontal START*/}

      {/* left */}

      {screen === 'Menu'
        ? lists.slice(lists.length < 2 ? 0 : 1).map((object, index) => (
            <StrokeElement
              setStrokeElementHeight={setStrokeElementHeight}
              parrentType={'ListOfList'}
              key={index} //? unique react component(need for React)
              textH1={object.listName}
              //TODO
              textH2={'word count'}
              countH2={object.order}
              textH3={'game count'}
              countH3={object.gameCount}
              line={false}
              isButtonDrag={false}
              order={index}
              axis={'horizontal'}
              pos={'left'}
            />
          ))
        : null}

      {/* right */}
      {screen === 'Menu'
        ? lists.slice(lists.length - 1).map((object, index) => (
            <StrokeElement
              setStrokeElementHeight={setStrokeElementHeight}
              parrentType={'ListOfList'}
              key={index} //? unique react component(need for React)
              textH1={object.listName}
              //TODO
              textH2={'word count'}
              countH2={object.order}
              textH3={'game count'}
              countH3={object.gameCount}
              line={false}
              isButtonDrag={false}
              order={index}
              axis={'horizontal'}
              pos={'right'}
            />
          ))
        : null}

      {/* horizontal END */}

      {/* vertical */}
      {lists.map((object, index) => (
        <StrokeElement
          setStrokeElementHeight={setStrokeElementHeight}
          parrentType={'ListOfList'}
          key={index} //? unique react component(need for React)
          textH1={object.listName}
          //TODO
          textH2={'word count'}
          // countH2={Object.keys(data.listOfList[key].words).length}
          countH2={object.order}
          textH3={'game count'}
          // countH3={data.listOfList[key]['game count']}
          countH3={object.gameCount}
          line={index === lists.length - 1 ? false : true} //? remove for last element
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
