import express from "express";

const router = express.Router();

router.post("/api/users/login", (req, res) => {
  res.send("Hello There From Netflix!");
});

export { router as loginRouter };
