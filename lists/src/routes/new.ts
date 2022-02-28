import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  ListStatus,
  requireAuth,
  validateRequest,
} from '@morfit/common';
import { Movie } from '../models/movie';
import { List } from '../models/list';

const router = express.Router();


router.post(
  '/api/lists',
  requireAuth,
  [
    body('title').not().isEmpty().withMessage('List title must be provided'),
    body('type').not().isEmpty().withMessage('List type must be provided'),
    body('content').isArray(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const newList = new List(req.body);

    const savedList = await newList.save();

    res.status(201).json(savedList);
  }
);

export { router as newListsRouter };
