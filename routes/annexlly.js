const {
  getAllAnnexllySchema,
  getAnnexllySchema,
  createAnnexllySchema,
  updateAnnexllySchema,
  deleteAnnexllySchema,
  incrementNumOfClicksSchema,
} = require("../controllers/schemas/annexlly");
const {
  getAllAnnexllyHandler,
  getAnnexllyHandler,
  createAnnexllyHandler,
  updateAnnexllyHandler,
  deleteAnnexllyHandler,
  incrementNumOfClicksHandler,
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

const updateAnnexllyOpts = {
  schema: updateAnnexllySchema,
  handler: updateAnnexllyHandler,
};

const deleteAnnexllyOpts = {
  schema: deleteAnnexllySchema,
  handler: deleteAnnexllyHandler,
};

const incrementNumOfClicksOpts = {
  schema: incrementNumOfClicksSchema,
  handler: incrementNumOfClicksHandler,
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

  fastify.put("/:id", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...updateAnnexllyOpts,
  });

  fastify.delete("/:id", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...deleteAnnexllyOpts,
  });

  fastify.put("/increment-clicks/:id", {
    preHandler: fastify.auth([fastify.verifyUserToken]),
    ...incrementNumOfClicksOpts,
  });
};

module.exports = affiliatesRoutes;

// TODO: work on affiliate subsections in the future, like codecademy/premium, codecademy/react
