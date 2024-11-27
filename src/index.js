import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(routes);

const PORT = process.env.PORT || 5003;

app.get("/", (req, res) => {
  res.cookie("hello", "Express", { maxAge: 10000 });
  res.status(201).send({ msg: "Hello Express" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
