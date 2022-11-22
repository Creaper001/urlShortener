import express from "express";
import UserController from "./controller/UserController";
import UrlController from "./controller/UrlController";

const router = express.Router();
router.post("/users", UserController.create);
router.post("/auth", UserController.index);
router.post("/urls", UrlController.create);
router.get("/urls", UrlController.list);
router.delete("/urls/:id", UrlController.remove);
router.get("/:userHashtag/:id", UrlController.redirect);
router.get("/", (req, res) => {
  return res.send("API:URLM");
});

export default router;
