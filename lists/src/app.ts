import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@morfit/common';
import { indexListsRouter } from './routes/index';
import { showListsRouter } from './routes/show';
import { newListsRouter } from './routes/new';
import { deleteListsRouter } from './routes/delete';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

app.use(indexListsRouter);
app.use(showListsRouter);
app.use(newListsRouter);
app.use(deleteListsRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
