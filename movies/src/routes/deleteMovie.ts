import express, { Request, Response } from 'express';
import { requireAuth, NotAuthorizedError, NotFoundError } from '@morfit/common';
import { Movie } from '../models/movie';

const router = express.Router();

router.delete(
  '/api/movies/:id',
  requireAuth,
  async (req: Request, res: Response) => {
    const movie = await Movie.findByIdAndDelete(req.params.id);

    // if ((req.currentUser! as any).role === 'USER') {
    //   throw new NotAuthorizedError();
    // }

    if (!movie) {
      throw new NotFoundError();
    }

    if (movie.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.status(200).json('The movie has been deleted...');
  }
);

export { router as deleteMovieRouter };
