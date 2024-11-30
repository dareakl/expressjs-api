export const createValidationSchema = {
  username: {
    isLength: {
      options: {
        min: 5,
        max: 30,
      },
      errorMessage: "Username must be at least 5 char with max of 30 char",
    },
    notEmpty: {
      errorMessage: "user name can not be empty",
    },
    isString: {
      errorMessage: "Username must be a string",
    },
  },
  displayName: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
};
