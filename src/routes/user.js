import express from "express";
import * as userController from "../controllers/user.js";
import getUser from "../middlewares/getUser.js";

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", getUser, userController.getUserId);
router.post("/", userController.postUser);
router.patch("/:id", getUser, userController.patchUser);
router.delete("/:id", getUser, userController.deleteUser);

export default router;