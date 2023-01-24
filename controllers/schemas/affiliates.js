const { UserAccessSchema } = require("./users");
const typeString = { type: "string" };

const AffiliateSchema = {
  type: "object",
  properties: {
    name: typeString,
    defaultUrl: typeString,
    id: typeString,
    newUrl: typeString,
    numOfClicks: { type: "number" },
    createdAt: { type: "string", format: "date-time" },
    userId: typeString,
  },
};

const getAllAffiliatesSchema = {
  headers: UserAccessSchema,
  response: {
    200: {
      type: "array",
      items: AffiliateSchema,
    },
  },
};

const getAffiliateSchema = {
  headers: UserAccessSchema,
  params: {
    id: typeString,
  },
  response: {
    200: AffiliateSchema,
  },
};

module.exports = { getAllAffiliatesSchema, getAffiliateSchema };
