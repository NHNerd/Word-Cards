import { useState, useEffect } from 'react';
import data from '../public/data/data.json';

import './Card.css';

function DnD() {
  // Get? listOfList
  const listOfList2 = Object.keys(data.listOfList);
  // Get? orders
  const orders2 = listOfList2.map((i) => data.listOfList[i].order);
  // Get? words
  const words2 = Object.keys(data.listOfList.list1.words);

  console.log(words2);
  const [cardList, setCardList] = useState([]);

  useEffect(() => {
    // Получаем данные из JSON и обновляем состояние
    setCardList(Object.values(data.listOfList));
  }, []);

  const [currentDragCard, setCurrentDragCard] = useState(null);

  function dragStarHandler(e, card) {
    setCurrentDragCard(card);
  }
  function dragLeaveHandler(e) {
    e.target.style.background = 'none';
  }
  function dragEndHandler(e) {}
  function dragOverHandler(e) {
    e.preventDefault();
    e.target.style.background = 'lightgreen';
  }
  function dragDropHandler(e, card) {
    e.preventDefault();

    e.target.style.background = 'none';

    setCardList(
      cardList.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentDragCard.order };
        }
        if (c.id === currentDragCard.id) {
          return { ...c, order: card.order };
        }
        return c;
      })
    );
  }

  const sortCards = (a, b) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <>
      <div className='card-container'>
        {cardList.sort(sortCards).map((card, index) => (
          <div
            key={index} // Добавляем уникальный ключ для каждого элемента карточки
            onDragStart={(e) => dragStarHandler(e, card)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragEnd={(e) => dragEndHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dragDropHandler(e, card)}
            draggable={true}
            className='card'
          >
            {/* Отображаем названия списков вместо слов */}
            <div>{`List ${card.order}`}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default DnD;
