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

//Opening BD
const openOrCreateDB = window.indexedDB.open('WordCards', 1);

openOrCreateDB.addEventListener('error', () => console.error('Error opening DB'));
openOrCreateDB.addEventListener('success', () => {
  console.log('Successfully opened DB');
  db = openOrCreateDB.result;
});
