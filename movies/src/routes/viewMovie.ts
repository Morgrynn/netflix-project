import express, { Request, Response } from 'express';
import { NotFoundError, requireAuth } from '@morfit/common';
import { Movie } from '../models/movie';

const router = express.Router();

router.get('/api/movies/:id',requireAuth, async (req: Request, res: Response) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throw new NotFoundError();
  }
  res.send(movie);
});

export { router as viewMovieRouter };
