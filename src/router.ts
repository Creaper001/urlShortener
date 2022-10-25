import express from "express";
import urlController from "./controller/urlController";
import userController from "./controller/userController";

const router = express.Router();

router.get("/:userID/:urlID", urlController.redirect);
router.post("/url", urlController.create);
router.post("/users", userController.create);
router.get("/users", userController.list);

export default router;
