const { JSONDB } = require("native-json-db");
const typeString = { type: "string" };

const Users = new JSONDB("users");

// create the users schema
const schema = {
  type: "object",
  required: ["name", "picture", "email", "id"],
  properties: {
    name: typeString,
    picture: typeString,
    email: typeString,
    id: typeString,
  },
};

// connect to local database
(async () => {
  await Users.connect(schema, { indentSpace: 2 });
})();

module.exports = Users;
