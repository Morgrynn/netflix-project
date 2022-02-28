import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@morfit/common';
import { Comment, CommentStatus } from '../models/comment';
import { CommentCancelledPublisher } from '../events/publishers/commentCancelledPublisher';
import { natsClient } from '../natsClient';

const router = express.Router();

router.delete(
  '/api/comments/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId).populate('movie')

    if (!comment) {
      throw new NotFoundError();
    }

    if (comment.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    comment.status = CommentStatus.Cancelled;
    await comment.save();

    // publish event to say was cancelled
    new CommentCancelledPublisher(natsClient.client).publish({
      id: comment.id,
      version: comment.version,
      movie: {
        id: comment.movie.id  
      }
    })


    res.status(204).send(comment);
  }
);

export { router as deleteCommentRouter };
