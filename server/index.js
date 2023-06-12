import server from './app.js';

const HOST = 'localhost';
const PORT = 3000;

const startServer = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is started: http://${HOST}:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startServer();
