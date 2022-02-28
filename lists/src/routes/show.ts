import express, { Request, Response } from 'express';
import { NotAuthorizedError, NotFoundError, requireAuth } from '@morfit/common';
import { List } from '../models/list';

const router = express.Router();

router.get(
  '/api/lists/:listsId',
  requireAuth,
  async (req: Request, res: Response) => {
    const list = await List.findById(req.params.listId).populate('movie');

    if (!list) {
      throw new NotFoundError();
    }

    if (list.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    res.send(list);
  }
);

export { router as showListsRouter };
