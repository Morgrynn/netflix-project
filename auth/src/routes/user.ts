import express from "express";

const router = express.Router();

router.get("/api/users/user", (req, res) => {
  res.send("Hello There From Netflix!");
});

export { router as userRouter };
