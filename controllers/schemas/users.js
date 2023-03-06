const typeString = { type: "string" };

const registerViaGoogleSchema = {
  body: {
    type: "object",
    required: ["code"],
    properties: {
      code: typeString,
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        token: typeString,
      },
    },
  },
};

const UserAccessSchema = {
  type: "object",
  required: ["access_token"],
  properties: {
    access_token: typeString,
  },
};

const getSignedInUserSchema = {
  headers: UserAccessSchema,
  response: {
    200: {
      type: "object",
      properties: {
        name: typeString,
        id: typeString,
        picture: typeString,
        email: typeString,
        createdAt: { type: "string", format: "date-time" },
        username: typeString,
      },
    },
  },
};

const updateUsernameSchema = {
  headers: UserAccessSchema,
  body: {
    type: "object",
    required: ["username"],
    properties: {
      username: typeString,
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        msg: typeString,
      },
    },
  },
};

module.exports = {
  registerViaGoogleSchema,
  getSignedInUserSchema,
  updateUsernameSchema,
  UserAccessSchema,
};
