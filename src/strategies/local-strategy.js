import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.js";

passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log(`Inside Deserializer`);
  console.log(`Deserilized User ID: ${id}`);
  try {
    const findUser = mockUsers.find((user) => user, id === id);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});
export default passport.use(
  new Strategy((username, password, done) => {
    console.log(`username: ${username}`);
    console.log(`password: ${password}`);
    try {
      const findUser = mockUsers.find((user) => user.username === username);
      if (!findUser) throw new Error("User Not Found");
      if (findUser.password !== password)
        throw new Error("invalid credentials");
      done(null, findUser);
    } catch (err) {
      done(err, null);
    }
  })
);
