import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassowrd = (passowrd) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  console.log(salt);
  return bcrypt.hashSync(passowrd, salt);
};

export const comparePassword = (plain, hashed) =>
  bcrypt.compareSync(plain, hashed);
