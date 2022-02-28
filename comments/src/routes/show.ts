import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@morfit/common';
import { Comment } from '../models/comment';

const router = express.Router();

router.get(
  '/api/comments/:commentId',
  requireAuth,
  async (req: Request, res: Response) => {
    const comment = await Comment.findById(req.params.commentId).populate('movie');

    if (!comment) {
      throw new NotFoundError();
    }

    if (comment.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(comment);
  }
);

export { router as showCommentRouter };
