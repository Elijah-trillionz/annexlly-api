const { JSONDB } = require("native-json-db");
const typeString = { type: "string" };

const Users = new JSONDB("users");

// create the users schema
const schema = {
  type: "object",
  required: ["name", "picture", "email", "id", "username"],
  properties: {
    name: typeString,
    picture: typeString,
    email: typeString,
    id: typeString,
    username: typeString,
    createdAt: { type: "string", format: "date-time" },
  },
};

// connect to local database
(async () => {
  await Users.connect(schema, { indentSpace: 2 });
})();

module.exports = Users;
