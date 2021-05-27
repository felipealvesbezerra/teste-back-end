import express from "express";
import * as controller from "../controllers/user.js";
import User from '../models/User.js';

const router = express.Router();

router.get("/", controller.getUsers);
router.get("/:id", getUser, controller.getUserId);
router.post("/", controller.postUser);
router.patch("/:id", getUser, controller.patchUser);

async function getUser(req, res, next) {

  let user;

  try {
    user = await User.findById(req.params.id);
  } catch (err) {
    return res.status(404).json({
      message: 'cannot find subscriber',
    });
  }

  res.user = user;

  next();

}

export default router;