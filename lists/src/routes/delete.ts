import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@morfit/common';
import { List, ListStatus } from '../models/list';

const router = express.Router();

router.delete('/api/lists/:listsId', requireAuth, async (req: Request, res: Response) => {
  const { listId } = req.params;
  const list = await List.findById(listId);

  if (!list) {
    throw new NotFoundError();
  }

  if (list.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  list.status = ListStatus.Cancelled;
  await list.save();

  // publish event to say was cancelled
  res.status(204).send(list);
});

export { router as deleteListsRouter };
