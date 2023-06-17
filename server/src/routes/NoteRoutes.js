import controllers from "../controllers/index.js";
import express from "express";
const router = express.Router();

router.get("/:slug", controllers.NoteList.slug);

router.post("/create", controllers.NoteList.create);
router.patch("/update", controllers.NoteList.updateNote);
router.delete("/:slug", controllers.NoteList.delete);

export default router;
