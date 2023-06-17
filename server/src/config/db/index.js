import mongoose from "mongoose";

export default async function connectdb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/son", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Connect failure!!! with the error", error);
  }
}
