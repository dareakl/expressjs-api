import { Router } from "express";

const router = Router();

router.get("/api/products", (req, res) => {
  console.log(req.headers.cookie);
  console.log(req.cookies);
  if (req.cookies.hello && req.cookies.hello === "Express")
    return res.send([{ id: 1, name: "chicken", price: "10.00" }]);
  return res.status(403).send({ msg: "Sorry. You need the correct cookie" });
});

export default router;
