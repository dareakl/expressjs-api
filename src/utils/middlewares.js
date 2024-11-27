import { mockUsers } from "./constants.js";
export const resolveIndexByUserId = (req, res, next) => {
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
