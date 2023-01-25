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

const SimpleResSchema = {
  type: "object",
  properties: {
    msg: typeString,
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

const AnnexllyBodySchema = {
  type: "object",
  required: ["name", "defaultUrl"],
  properties: {
    name: typeString,
    defaultUrl: typeString,
  },
};

const createAnnexllySchema = {
  headers: UserAccessSchema,
  body: AnnexllyBodySchema,
  response: {
    200: SimpleResSchema,
  },
};

const updateAnnexllySchema = {
  headers: UserAccessSchema,
  params: {
    id: typeString,
  },
  body: AnnexllyBodySchema,
  response: {
    200: SimpleResSchema,
  },
};

const deleteAnnexllySchema = {
  headers: UserAccessSchema,
  params: {
    id: typeString,
  },
  response: {
    200: SimpleResSchema,
  },
};

module.exports = {
  getAllAnnexllySchema,
  getAnnexllySchema,
  createAnnexllySchema,
  updateAnnexllySchema,
  deleteAnnexllySchema,
};
