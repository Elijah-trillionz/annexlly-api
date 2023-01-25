const {
  getAllAnnexllySchema,
  getAnnexllySchema,
  createAnnexllySchema,
} = require("../controllers/schemas/annexlly");
const {
  getAllAnnexllyHandler,
  getAnnexllyHandler,
  createAnnexllyHandler,
} = require("../controllers/handlers/annexlly");

const getAllAnnexllyOpts = {
  schema: getAllAnnexllySchema,
  handler: getAllAnnexllyHandler,
};

const getAnnexllyOpts = {
  schema: getAnnexllySchema,
  handler: getAnnexllyHandler,
};

const createAnnexllyOpts = {
  schema: createAnnexllySchema,
  handler: createAnnexllyHandler,
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
    ...getAllAnnexllyOpts,
  });

  fastify.get("/:id", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...getAnnexllyOpts,
  });

  fastify.post("/new", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...createAnnexllyOpts,
  });

  // create an affiliate link
  // update an affiliate link
  // delete an affiliate link

  // update num of clicks
};

module.exports = affiliatesRoutes;

// TODO: work on affiliate subsections in the future, like codecademy/premium, codecademy/react
