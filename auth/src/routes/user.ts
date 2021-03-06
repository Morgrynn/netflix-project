import express from 'express';

import { currentUser } from '@morfit/common';

const router = express.Router();

router.get('/api/users/user', currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as userRouter };
