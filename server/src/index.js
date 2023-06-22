import express from "express";
import connectdb from "./config/db/index.js";
import Routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import "./config/firebase/FirebaseConfig.js";
import { getAuth } from "firebase-admin/auth";

const app = express();
var port = 8008;
connectdb();

const authorizationJWT = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.split(" ")[1];
    const decodedToken = await getAuth().verifyIdToken(accessToken);
    res.locals.uid = decodedToken.uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};
app.use(bodyParser.json(), cors(), authorizationJWT);

Routes(app);

app.listen(port, () => {
  console.log(`app is listening on port ${port} `);
});
