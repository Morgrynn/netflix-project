import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  BadRequestError,
  NotFoundError,
  CommentStatus,
  requireAuth,
  validateRequest,
} from '@morfit/common';
import { body } from 'express-validator';
import { Movie } from '../models/movie';
import { Comment } from '../models/comment';
import { CommentCreatedPublisher } from '../events/publishers/commentCreatedPublisher';
import { natsClient } from '../natsClient';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 1 * 60;

router.post(
  '/api/comments',
  requireAuth,
  [
    body('movieId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('MovieId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { movieId } = req.body;
    // Find the Movie the user is trying to comment in the database
    // Find the Movie the user is trying to list in the database
    const movie = await Movie.findById(movieId);

    if (!movie) {
      throw new NotFoundError();
    }

    // Make sure that this Movie is not already reserved

    // const isReserved = await movie.isReserved();
    // if (isReserved) {
    //   throw new BadRequestError('Movie already reserved');
    // }

    // Calculate an expiration date for this comment
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the comment and save to the database
    // Build the list and save to the database
    const comment = Comment.build({
      userId: req.currentUser!.id,
      status: CommentStatus.Created,
      content: req.body.content,
      expiresAt: expiration,
      movie,
    });
    await comment.save();
    // Publish an event saying that an comment was created
    // Publish an event saying that an list was created
    new CommentCreatedPublisher(natsClient.client).publish({
      id: comment.id,
      version: comment.version,
      content: req.body.content,
      status: comment.status,
      userId: comment.userId,
      expiresAt: comment.expiresAt.toISOString(),
      movie: {
        id: movie.id,
        title: movie.title,
      },
    });

    // res.send({});
    res.status(201).send(comment);
  }
);

export { router as newCommentRouter };
