import server from './app.js';
import dotnev from 'dotenv';
dotnev.config();

const HOST = 'localhost';
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    server.listen(PORT, () => console.log(`Server is started: http://${HOST}:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startServer();
