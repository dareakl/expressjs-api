import express from "express";
import { query, validationResult, body, matchedData } from "express-validator";
const app = express();

app.use(express.json());

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};
//app.use(loggingMiddleware);
const resolveIndexByUserId = (req, res, next) => {
  const {
    params: { id },
  } = req;
  const parseId = parseInt(id, 10);
  if (isNaN(parseId)) return res.status(400).send({ error: "Invalid user ID" });
  const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  req.findUserIndex = findUserIndex;
  next();
};

const PORT = process.env.PORT || 5003;

const mockUsers = [
  { id: 1, username: "sathish", displayName: "Sathish" },
  { id: 2, username: "raja", displayName: "Raja" },
  { id: 3, username: "david", displayName: "David" },
  { id: 4, username: "manoj", displayName: "Manoj" },
  { id: 5, username: "karan", displayName: "Karan" },
  { id: 6, username: "nila", displayName: "Nila" },
  { id: 7, username: "ravi", displayName: "Ravi" },
];
app.get("/", loggingMiddleware, (req, res) => {
  res.send("Hello Express");
});

app.get(
  "/api/users",
  query("filter")
    .isString()
    .notEmpty()
    .withMessage("Must not be empty")
    .isLength({ min: 2, max: 12 })
    .withMessage("must be at least 3-12 characters"),
  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    const {
      query: { filter, value },
    } = req;

    if (filter && value)
      return res.send(mockUsers.filter((user) => user[filter].includes(value)));
    return res.send(mockUsers);
  }
);

app.post(
  "/api/users",
  [
    body("username")
      .notEmpty()
      .withMessage("Username can not be empty")
      .isLength({ min: 5, max: 30 })
      .withMessage("username atleast 5 char and max of 30 char")
      .isString()
      .withMessage("Username must be string"),
    body("displayName").notEmpty(),
  ],

  (req, res) => {
    const result = validationResult(req);
    console.log(result);
    if (!result.isEmpty())
      return res.status(400).send({ errors: result.array() });
    const data = matchedData(req);
    const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
    mockUsers.push(newUser);
    return res.status(201).send(newUser);
  }
);

app.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});
app.get("/api/products", (req, res) => {
  res.send([{ id: 1, name: "chicken", price: "10.00" }]);
});
app.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  // Return a successful response
  return res.status(200).send({ message: "User updated successfully" });
});

app.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.status(200).send({ message: "User updated successfully" });
});

app.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);
  return res.status(200).send({ message: "User deleted successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
