import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import Logger from './src/Utils/Logger.js';
import adminRouter from './src/Routes/adminRouter.js';
import userRouter from './src/Routes/userRouter.js';
import reportRouter from './src/Routes/reportRouter.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

//multa
app.use('/photos/users', express.static('src/photos/users'));

//testing health
app.get('/health', (req, res) => {
    res.status(200).send('I am very healthy💪');
});

// routes
app.use('/api', adminRouter);
app.use('/api', userRouter);
app.use('/api', reportRouter);

// start server
app.listen(port, () => {
    Logger.info(`Server running on http://localhost:${port}`);
});