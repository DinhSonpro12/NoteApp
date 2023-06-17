import FolderRoute from "./FolderRoutes.js";
import NoteRoute from "./NoteRoutes.js";

export default function Routes(app) {
  app.use("/api/folder", FolderRoute);
  app.use("/api/note", NoteRoute);
}
