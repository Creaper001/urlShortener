import express from "express";
import urlController from "./controller/urlController";
import userController from "./controller/userController";

const router = express.Router();

router.get("/:userID/:urlID", urlController().redirect);
router.get("/:userID", () => {});
router.get("/:urlID", () => {});

router.post("/user", userController().create);
router.post("/url", () => {});

export default router;
