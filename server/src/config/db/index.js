import mongoose from "mongoose";
const URI =
  "mongodb+srv://dinhson:3NqyHLIGTowXaJs9@dinhson.gqguov9.mongodb.net/NoteApp?retryWrites=true&w=majority";

export default async function connectdb() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!! with the error", error);
  }
}
