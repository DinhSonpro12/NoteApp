import { NoteModel, FolderModel } from "../model/index.js";

const Controllers = {
  FolderControllers: {
    async index(req, res) {
      try {
        const data = await FolderModel.find({ authorId: res.locals.uid });
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async slug(req, res) {
      try {
        const data = await NoteModel.find({
          folderId: req.params.slug,
        });
        res.json(data);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async create(req, res) {
      try {
        console.log("req.body", req.body);
        const newFolder = new FolderModel({
          name: req.body.name,
          authorId: res.locals.uid,
        });

        newFolder.save();
        res.status(201).send("Bài viết đã được tạo thành công");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async rename(req, res) {
      try {
        await FolderModel.findByIdAndUpdate(req.body.folderId, {
          name: req.body.newName,
        });
        res.status(201).send("Bài viết đã được tạo thành công");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async delete(req, res) {
      try {
        console.log("folderId", req.params.slug);
        await FolderModel.deleteOne({ _id: req.params.slug });

        // xóa cả các nodelist con của folder
        await NoteModel.deleteMany({ folderId: req.params.slug });
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  },

  NoteList: {
    async slug(req, res) {
      try {
        const data = await NoteModel.find({ _id: req.params.slug });
        res.json(data);
        // res.send(req.params);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async create(req, res) {
      try {
        console.log("req.body", req.body);
        const newNote = new NoteModel({
          content: req.body.content,
          folderId: req.body.folderId,
        });
        newNote.save();
        res.status(201).send("Create newNote successful!");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
    async updateNote(req, res) {
      try {
        await NoteModel.findByIdAndUpdate(req.body.noteID, {
          content: req.body.content,
        });
        console.log(req.body.content);

        res.status(201).send("modify content successful");
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },

    async delete(req, res) {
      try {
        await NoteModel.deleteOne({ _id: req.params.slug });

        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    },
  },
};

export default Controllers;
