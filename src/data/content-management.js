const apiUrl = 'http://localhost:5000';

function addListFetch(list) {
  return fetch(apiUrl + `/api/addlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(list), //? Parsing object to JSON stroke
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('add List: ' + data.message);
    })
    .catch((error) => {
      throw error;
    });
}

function listsFetch() {
  return fetch(apiUrl + `/api/lists?userid=${localStorage.getItem('userId')}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  })
    .then((response) => {
      if (response.status === 500) {
        throw new Error('Server Error');
      } else if (response.status === 401) {
        // Если получен статус 401, это означает, что пользователь не авторизован
        throw new Error('Unauthorized');
      }
      return response.json();
    })
    .then((data) => {
      if (data.length >= 2) {
        data.sort((a, b) => a.order - b.order);
      }

      return data;
    })
    .catch((error) => {
      if (error.message === 'Unauthorized') {
        // Обработка ошибки 401: например, перенаправление на страницу входа
        console.error('Unauthorized: User is unauthorized');
        // Здесь можно выполнить дополнительные действия, связанные с обработкой ошибки 401
        throw error;
      } else {
        console.error('Error: lists: ' + error);
        throw error;
        // Если это другая ошибка, можно обработать её соответствующим образом
      }
      //? throw error on up layer for try catch
    });
}

function replaceListFetch(lists) {
  return fetch(apiUrl + `/api/replacelists`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
    body: JSON.stringify(lists), //? Parsing object to JSON stroke
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('add List: ' + data.message);
    })
    .catch((error) => {
      throw error;
    });
}

function deleteListFetch(listId) {
  return fetch(apiUrl + `/api/deleteword${listId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('deleteListFetch: ' + data.message);
    })
    .catch((error) => {
      throw error;
    });
}

// function wordsFetch() {
//   return fetch(apiUrl + `/api/lists?userid=${localStorage.getItem('userId')}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
//     },
//   })
//     .then((response) => {
//       if (response.status === 500) {
//         throw new Error('Server Error');
//       } else if (response.status === 401) {
//         // Если получен статус 401, это означает, что пользователь не авторизован
//         throw new Error('Unauthorized'); // Выбрасываем ошибку
//       }
//       return response.json();
//     })
//     .then((data) => {
//       localStorage.setItem('lists', JSON.stringify(data));
//       const listNames = data.map((element) => element.listName);
//       console.log('lists success got: ' + listNames);
//       return data;
//     })
//     .catch((error) => {
//       if (error.message === 'Unauthorized') {
//         // Обработка ошибки 401: например, перенаправление на страницу входа
//         console.error('Unauthorized: User is unauthorized');
//         // Здесь можно выполнить дополнительные действия, связанные с обработкой ошибки 401
//         throw error;
//       } else {
//         console.error('Error: lists: ' + error);
//         throw error;
//         // Если это другая ошибка, можно обработать её соответствующим образом
//       }
//       //? throw error on up layer for try catch
//     });
// }

export { addListFetch, listsFetch, replaceListFetch, deleteListFetch };
