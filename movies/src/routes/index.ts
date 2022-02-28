import express, { Request, Response } from 'express';
import { requireAuth } from '@morfit/common';
import { Movie } from '../models/movie';

const router = express.Router();

router.get('/api/movies', requireAuth, async (req: Request, res: Response) => {
  const movies = await Movie.find({});

  res.send(movies);
});

export { router as indexMovieRouter };
