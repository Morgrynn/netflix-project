import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { RequestValidationError } from "../errors/requestValidationError";



const router = express.Router();

router.post("/api/users/login", [
  body('email').isEmail().withMessage('Email must be valid'),
  body("password")
      .trim()
      .notEmpty()
      .withMessage("Must have valid password"),
], (req: Request, res: Response) => {
  const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }
});

export { router as loginRouter };
