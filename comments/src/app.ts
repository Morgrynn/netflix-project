import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@morfit/common';
import { indexCommentRouter } from './routes/index';
import { showCommentRouter } from './routes/show';
import { newCommentRouter } from './routes/new';
import { deleteCommentRouter } from './routes/delete';


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

app.use(indexCommentRouter)
app.use(showCommentRouter)
app.use(newCommentRouter)
app.use(deleteCommentRouter)



app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
