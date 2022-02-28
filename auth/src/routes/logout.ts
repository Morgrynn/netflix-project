import express from "express";

const router = express.Router();

router.get("/api/users/logout", (req, res) => {
  req.session = null

  res.send({})
});

export { router as logoutRouter };
