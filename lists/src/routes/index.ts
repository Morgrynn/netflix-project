import express, { Request, Response } from 'express';
import { requireAuth } from '@morfit/common';
import { List } from '../models/list';


const router = express.Router();

router.get('/api/lists',requireAuth, async (req: Request, res: Response) => {
  const lists = await List.find({
    userId: req.currentUser!.id,
  }).populate('movie');
  res.send(lists);
});

export { router as indexListsRouter };
