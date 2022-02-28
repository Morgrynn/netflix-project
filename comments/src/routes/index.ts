import express, { Request, Response } from 'express';
import { requireAuth } from '@morfit/common';
import { Comment } from '../models/comment';

const router = express.Router();

router.get('/api/comments', requireAuth, async (req: Request, res: Response) => {
  const comment = await Comment.find({
    userId: req.currentUser!.id,
  }).populate('movie');

  res.status(201).send(comment);
});

export { router as indexCommentRouter };
