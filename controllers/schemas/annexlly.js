const { UserAccessSchema } = require("./users");
const typeString = { type: "string" };

const AnnexllySchema = {
  type: "object",
  properties: {
    name: typeString,
    defaultUrl: typeString,
    id: typeString,
    newPath: typeString,
    numOfClicks: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
    userId: typeString,
  },
};

const getAllAnnexllySchema = {
  headers: UserAccessSchema,
  response: {
    200: {
      type: "array",
      items: AnnexllySchema,
    },
  },
};

const getAnnexllySchema = {
  headers: UserAccessSchema,
  params: {
    id: typeString,
  },
  response: {
    200: AnnexllySchema,
  },
};

const createAnnexllySchema = {
  headers: UserAccessSchema,
  body: {
    type: "object",
    required: ["name", "defaultUrl"],
    properties: {
      name: typeString,
      defaultUrl: typeString,
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
  getAllAnnexllySchema,
  getAnnexllySchema,
  createAnnexllySchema,
};
