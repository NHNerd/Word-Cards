import data from '../../public/data/data.json';

//? Parsing Objaect to Array
let jsonArray = Object.values(data.listOfList);

export function increase(i) {
  i = i + 1;
  console.log(i);
  const firstElement = jsonArray.shift();
  jsonArray.push(firstElement);
  // console.log(jsonArray);

  return i;
}

export function decrease(i) {
  i = i - 1;
  console.log(i);
  return i;
}

let db;
if (!window.indexedDB) {
  window.alert(
    'Ваш браузер не поддерживает стабильную версию IndexedDB. Такие-то функции будут недоступны'
  );
}
//Opening BD
const request = window.indexedDB.open('WordCards', 1);

request.addEventListener('error', () => console.error('Error opening DB'));
request.addEventListener('success', () => {
  console.log('Successfully opened DB');
  db = request.result;
});
