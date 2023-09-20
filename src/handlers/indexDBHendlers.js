let db;

//Opening BD
const openOrCreateDB = indexedDB.open('WordCards', 1);

openOrCreateDB.addEventListener('error', (error) => console.error('Error opening DB: ' + error));
openOrCreateDB.addEventListener('success', () => {
  console.log('Successfully opened DB');
  db = openOrCreateDB.result;
  getLists();
});

openOrCreateDB.addEventListener('upgradeneeded', (e) => {
  console.log('upgrade DB');
  db = e.target.result;

  if (!db.objectStoreNames.contains('ListOfList')) {
    db.createObjectStore('ListOfList', { keyPath: 'id', autoIncrement: true });
  }
  getLists();
});

export function addList(listName) {
  const transaction = db.transaction('ListOfList', 'readwrite');
  const store = transaction.objectStore('ListOfList');

  const listObject = { name: listName };

  const request = store.add(listObject);

  request.onsuccess = () => {
    console.log(`List added with ID: ${listName}`);
    getLists();
  };

  request.onerror = (error) => {
    console.error('Error adding list:', error);
  };
}

export function getLists() {
  const transaction = db.transaction('ListOfList', 'readonly');
  const store = transaction.objectStore('ListOfList');
  const getAll = store.getAll();
  getAll.onsuccess = (e) => {
    const requestList = e.target.result;
    console.log(...requestList);
  };
  getAll.onerror = (error) => {
    console.log(`Don't success got lists: ${error}`);
  };
}
