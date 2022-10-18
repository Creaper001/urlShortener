import express from "express";
import urlController from "./controller/urlController";

const router = express.Router();

router.get("/:userID/:urlID", urlController.redirect);
router.post("/url", urlController.create);

export default router;
