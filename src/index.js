import express from "express";
import routes from "./routes/index.js";
const app = express();

app.use(express.json());
app.use(routes);

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};
//app.use(loggingMiddleware);

const PORT = process.env.PORT || 5003;

app.get("/", loggingMiddleware, (req, res) => {
  res.send("Hello Express");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
