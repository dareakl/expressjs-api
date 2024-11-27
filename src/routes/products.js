import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  res.send([{ id: 1, name: "chicken", price: "10.00" }]);
});

export default router;
