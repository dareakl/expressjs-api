import express from "express";

const app = express();

const PORT = process.env.PORT || 5003;

app.get("/", (req, res) => {
  res.send("Hello Express");
});

app.get("/api/users", (req, res) => {
  res.send([
    { id: 1, username: "sathish", displayName: "Sathish" },
    { id: 2, username: "raja", displayName: "Raja" },
    { id: 3, username: "david", displayName: "David" },
  ]);
});

app.get("/api/products", (req, res) => {
  res.send([{ id: 1, name: "chicken", price: "10.00" }]);
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
