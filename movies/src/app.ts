import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@morfit/common';
import { indexMovieRouter } from './routes/index';
import { viewMovieRouter } from './routes/viewMovie';
import { createMovieRouter } from './routes/createMovie';
import { updateMovieRouter } from './routes/updateMovie';
import { deleteMovieRouter } from './routes/deleteMovie';

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

app.use(indexMovieRouter);
app.use(viewMovieRouter);
app.use(createMovieRouter);
app.use(updateMovieRouter);
app.use(deleteMovieRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
