import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '@morfit/common';
import { Movie } from '../models/movie';
import { MovieCreatedPublisher } from '../events/publishers/movieCreatedPublisher';
import { natsClient } from '../natsClient';

const router = express.Router();

router.post(
  '/api/movies',
  requireAuth,
  [body('title').not().isEmpty().withMessage('Title is required')],
  validateRequest,
  async (req: Request, res: Response) => {
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

    const movie = Movie.build({
      title,
      desc,
      imgTitle,
      img,
      thumbnail,
      trailer,
      video,
      year,
      workout,
      userId: req.currentUser!.id,
    });

    await movie.save();
    new MovieCreatedPublisher(natsClient.client).publish({
      id: movie.id,
      version: movie.version,
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
    });

    // console.log(movie);
    res.status(201).send(movie);
  }
);

export { router as createMovieRouter };
