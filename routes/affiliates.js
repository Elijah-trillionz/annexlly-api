const {
  getAllAffiliatesSchema,
  getAffiliateSchema,
} = require("../controllers/schemas/affiliates");
const {
  getAllAffiliatesHandler,
  getAffiliateHandler,
} = require("../controllers/handlers/affiliates");

const getAllAffiliatesOpts = {
  schema: getAllAffiliatesSchema,
  handler: getAllAffiliatesHandler,
};

const getAffiliateOpts = {
  schema: getAffiliateSchema,
  handler: getAffiliateHandler,
};

const affiliatesRoutes = (fastify, opts, done) => {
  fastify.register(require("@fastify/auth")).after(() => {
    affiliatePrivateRoutes(fastify);
  });

  done();
};

const affiliatePrivateRoutes = (fastify) => {
  fastify.get("/", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...getAllAffiliatesOpts,
  });

  fastify.get("/:id", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...getAffiliateOpts,
  });

  // create an affiliate link
  // update an affiliate link
  // delete an affiliate link
};

module.exports = affiliatesRoutes;
