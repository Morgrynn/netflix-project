import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotAuthorizedError,
  NotFoundError,
  BadRequestError,
} from '@morfit/common';
import { Movie } from '../models/movie';
import { MovieUpdatedPublisher } from '../events/publishers/movieUpdatedPublisher';
import { natsClient } from '../natsClient';

const router = express.Router();

router.put(
  '/api/movies/:id',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
    const movie = await Movie.findById(req.params.id);

    // if ((req.currentUser! as any).role === 'USER') {
    //   throw new NotAuthorizedError();
    // }
    const {
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    } = req.body;

    if (!movie) {
      throw new NotFoundError();
    }

    if (movie.commentId) {
      throw new BadRequestError('Cannot comment on a movie now');
    }

    if (movie.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    movie.set({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
    });
    await movie.save();

    await new MovieUpdatedPublisher(natsClient.client).publish({
      id: movie.id,
      title: movie.title,
      desc: movie.desc,
      imgTitle: movie.imgTitle,
      img: movie.img,
      thumbnail: movie.thumbnail,
      trailer: movie.trailer,
      video: movie.video,
      year: movie.year,
      workout: movie.workout,
      userId: movie.userId,
      version: movie.version,
    });

    res.send(movie);
  }
);

export { router as updateMovieRouter };
