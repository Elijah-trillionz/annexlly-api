const { JSONDB } = require("native-json-db");
const typeString = { type: "string" };

const Annexlly = new JSONDB("annexlly");

const schema = {
  type: "object",
  required: ["name", "id", "defaultUrl", "newPath", "numOfClicks", "userId"],
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

(async () => {
  await Annexlly.connect(schema, { indentSpace: 2 });
})();

module.exports = Annexlly;
