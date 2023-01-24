const { JSONDB } = require("native-json-db");
const typeString = { type: "string" };

const Affiliates = new JSONDB("affiliates");

const schema = {
  type: "object",
  required: ["name", "id", "defaultUrl", "newUrl", "numOfClicks", "userId"],
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

(async () => {
  await Affiliates.connect(schema, { indentSpace: 2 });
})();

module.exports = Affiliates;
