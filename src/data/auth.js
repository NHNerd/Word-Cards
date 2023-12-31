// MDB - mongoDB
const apiUrl = 'http://localhost:5000';

function registrationHandler(newUser) {
  return fetch(apiUrl + '/api/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser), //? Parsing object to JSON stroke
    credentials: 'include', //? Это позволит передавать куки между клиентом и сервером
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('registration: ' + data.message);
    })

    .catch((error) => {
      console.error('Error: registration: ' + error);
      throw error; //? throw error on up layer for try catch
    });
}

function loginHandler(user) {
  return fetch(apiUrl + '/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user), //? Parsing object to JSON stroke
    credentials: 'include', //? Это позволит передавать куки между клиентом и сервером
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('userId', data.userId);
      console.log('login: ' + data.message);
      return data;
    })
    .catch((error) => {
      console.error('Error: login: ' + error);
      throw error; //? throw error on up layer for try catch
    });
}

export { registrationHandler, loginHandler };
