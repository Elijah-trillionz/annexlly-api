const typeString = { type: "string" };

const registerViaGoogleSchema = {
  query: {
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

const getSignedInUserSchema = {
  headers: {
    type: "object",
    required: ["access_token"],
    properties: {
      access_token: typeString,
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        name: typeString,
        id: typeString,
        picture: typeString,
        email: typeString,
      },
    },
  },
};

module.exports = { registerViaGoogleSchema, getSignedInUserSchema };
