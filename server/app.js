import express from 'express';
// import http from 'http'; //? fixes busy port issue when refresh server
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import errorMiddleware from './middleware/error-middleware.js';

//Routers
import router from './routers/index.js';

import './config.js';

const app = express();
// const server = http.createServer(app);

// connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB is connected'))
  .catch(() => console.log('ERROR MongoDB'));

// pasring
// app.use('/public', express.static('public')); //? Setup folder like static for setup URL
app.use(express.json()); //? For express will be can reade json from request / parsing
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware); // Must be last in chain of middleware

// app.get('/', (req, res) => {
//   res.send('hello');
// });

export default app;
