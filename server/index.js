import app from './app.js';
import './config.js';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    app.listen(PORT, () => console.log(`Server is started: http://${HOST}:${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

startServer();
