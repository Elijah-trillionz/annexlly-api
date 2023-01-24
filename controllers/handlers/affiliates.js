const { sendError } = require("./users");
const Affiliates = require("../../models/Affiliates");

const getAllAffiliatesHandler = async (req, reply) => {
  const { id: userId } = req.user;
  try {
    const affiliates = await Affiliates.findMany({ userId });
    if (affiliates.length <= 0)
      return sendError(404, "You have no affiliate links yet", reply);

    return reply.send(affiliates);
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

const getAffiliateHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const affiliate = await Affiliates.findOne({ userId, id });
    if (!affiliate)
      return sendError(404, "This affiliate link does not exist", reply);

    return reply.send(affiliate);
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

module.exports = { getAllAffiliatesHandler, getAffiliateHandler };
