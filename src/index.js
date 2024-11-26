import express from "express";

const app = express();

const PORT = process.env.PORT || 5003;

const mockUsers = [
  { id: 1, username: "sathish", displayName: "Sathish" },
  { id: 2, username: "raja", displayName: "Raja" },
  { id: 3, username: "david", displayName: "David" },
];
app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/api/users", (req, res) => {
  res.send(mockUsers);
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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
