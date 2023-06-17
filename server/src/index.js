import express from "express";
import connectdb from "./config/db/index.js";
import Routes from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
var port = 8008;

app.use(cors());
app.use(bodyParser.json());

connectdb();

Routes(app);

app.listen(port, () => {
  console.log(`app is listening on port ${port} `);
});
