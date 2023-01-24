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

module.exports = { registerViaGoogleSchema };
