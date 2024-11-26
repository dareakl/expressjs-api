import express from "express";

const app = express();

app.use(express.json());

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
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/api/users", (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(mockUsers.filter((user) => user[filter].includes(value)));
  return res.send(mockUsers);
});

app.post("/api/users", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

app.get("/api/users/:id", (req, res) => {
  const parseId = parseInt(req.params.id);
  if (isNaN(parseId))
    return res.status(400).send({ msg: "Bad Request.Invalid ID" });
  const findUser = mockUsers.find((user) => user.id === parseId);
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});
app.get("/api/products", (req, res) => {
  res.send([{ id: 1, name: "chicken", price: "10.00" }]);
});
app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  // Ensure the id is a valid integer
  const parseId = parseInt(id, 10);
  if (isNaN(parseId)) return res.status(400).send({ error: "Invalid user ID" });

  // Find the user by ID
  const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1)
    return res.status(404).send({ error: "User not found" });

  // Update user with the data from the body
  mockUsers[findUserIndex] = { id: parseId, ...body };

  // Return a successful response
  return res.status(200).send({ message: "User updated successfully" });
});

app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  const parseId = parseInt(id, 10);
  if (isNaN(parseId)) return res.status(400).send({ error: "Invalid user ID" });
  const findUserIndex = mockUsers.findIndex((user) => user.id === parseId);
  if (findUserIndex === -1) return res.sendStatus(404);
  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.status(200).send({ message: "User updated successfully" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
