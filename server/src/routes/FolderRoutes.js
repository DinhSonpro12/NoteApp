import controllers from "../controllers/index.js";
import express from "express";

const router = express.Router();

router.get("/:slug", controllers.FolderControllers.slug);
router.get("/", controllers.FolderControllers.index);

router.post("/create", controllers.FolderControllers.create);
router.patch("/rename", controllers.FolderControllers.rename);
router.delete("/:slug", controllers.FolderControllers.delete);

export default router;
