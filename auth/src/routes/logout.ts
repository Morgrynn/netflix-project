import express from "express";

const router = express.Router();

router.post("/api/users/logout", (req, res) => {
  res.send("Hello There From Netflix!");
});

export { router as logoutRouter };
