import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';

import { userRouter } from './routes/user';
import { loginRouter } from './routes/login';
import { registerRouter } from './routes/register';
import { logoutRouter } from './routes/logout';
import { errorHandler } from './middlewares/errorHandlers';
import { NotFoundError } from './errors/notFoundError';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(registerRouter);
app.use(loginRouter);
app.use(userRouter);
app.use(logoutRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
