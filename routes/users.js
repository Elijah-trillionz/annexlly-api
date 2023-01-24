const {
  registerViaGoogleSchema,
  getSignedInUserSchema,
} = require("../controllers/schemas/users");
const {
  registerViaGoogleHandler,
  getSignedInUserHandler,
} = require("../controllers/handlers/users");

const registerViaGoogleOpts = {
  schema: registerViaGoogleSchema,
  handler: registerViaGoogleHandler,
};

const getSignedInUserOpts = {
  schema: getSignedInUserSchema,
  handler: getSignedInUserHandler,
};

const usersRoutes = (fastify, opts, done) => {
  fastify.get("/signin", registerViaGoogleOpts);

  // temp
  fastify.get("/register/callback", (req, reply) => {
    reply.redirect(`/api/users/signin?code=${req.query.code}`);
  });

  fastify.register(require("@fastify/auth")).after(() => {
    userPrivateRoutes(fastify);
  });

  done();
};

const userPrivateRoutes = (fastify) => {
  fastify.get("/user", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...getSignedInUserOpts,
  });

  // change username
};

module.exports = usersRoutes;
