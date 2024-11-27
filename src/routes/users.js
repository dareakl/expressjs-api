import { Router } from "express";
import {
  query,
  validationResult,
  checkSchema,
  matchedData,
} from "express-validator";
import { createValidationSchema } from "../utils/validationSchemas.js";
import { mockUsers } from "../utils/constants.js";
import { resolveIndexByUserId } from "../utils/middlewares.js";

const router = Router();

const loggingMiddleware = (req, res, next) => {
  console.log(`${req.method} - ${req.url}`);
  next();
};

router.get(
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

router.get("/api/users/:id", resolveIndexByUserId, (req, res) => {
  console.log(req.session.id);
  req.sessionStore.get(req.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });
  const { findUserIndex } = req;
  const findUser = mockUsers[findUserIndex];
  if (!findUser) return res.sendStatus(404);
  return res.send(findUser);
});

router.post("/api/users", checkSchema(createValidationSchema), (req, res) => {
  const result = validationResult(req);
  console.log(result);
  if (!result.isEmpty())
    return res.status(400).send({ errors: result.array() });
  const data = matchedData(req);
  const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
  mockUsers.push(newUser);
  return res.status(201).send(newUser);
});

router.put("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;
  mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
  // Return a successful response
  return res.status(200).send({ message: "User updated successfully" });
});

router.patch("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { body, findUserIndex } = req;

  mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body };
  return res.status(200).send({ message: "User updated successfully" });
});

router.delete("/api/users/:id", resolveIndexByUserId, (req, res) => {
  const { findUserIndex } = req;

  mockUsers.splice(findUserIndex, 1);
  return res.status(200).send({ message: "User deleted successfully" });
});
export default router;
