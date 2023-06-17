import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();

const port = 5000;

app.use(express.json());

// Tạo JWT
const payload = {
  userId: 123,
  username: "john.doe",
};

const secretKey = process.env.SECRET_KEY;

const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

console.log("Token:", token);

// // Xác thực JWT
// jwt.verify(token, secretKey, (err, decoded) => {
//   if (err) {
//     console.error('Lỗi xác thực:', err);
//   } else {
//     console.log('Thông tin giải mã:', decoded);
//   }
// });

app.get("/book", (req, res) => {
  res.json(token);
});

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
