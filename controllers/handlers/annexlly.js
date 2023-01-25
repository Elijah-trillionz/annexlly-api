const { sendError } = require("./users");
const Annexlly = require("../../models/Annexlly");
const Users = require("../../models/Users");
const { ulid } = require("ulid");

const getAllAnnexllyHandler = async (req, reply) => {
  const { id: userId } = req.user;
  try {
    const annexlly = await Annexlly.findMany({ userId });
    if (annexlly.length <= 0)
      return sendError(404, "You have no annexlly links yet", reply);

    return reply.send(annexlly);
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

const getAnnexllyHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const annexlly = await Annexlly.findOne({ userId, id });
    if (!annexlly)
      return sendError(404, "This annexlly link does not exist", reply);

    return reply.send(annexlly);
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

const createAnnexllyHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { name, defaultUrl } = req.body;

  try {
    const annexllyNameExists = await Annexlly.findOne({ name, userId });
    if (annexllyNameExists?.name)
      return sendError(
        400,
        "You've used a similar name to create an annexlly link, use another",
        reply
      );

    const annexllyLinkExists = await Annexlly.findOne({ defaultUrl, userId });
    if (annexllyLinkExists?.name)
      return sendError(
        400,
        "You've already created an annexlly link for this affiliate url before",
        reply
      );

    const user = await Users.findOne({ id: userId });

    // prevents paths like annexlly.com//codecademy rather than annexlly.com/johndoe22/codecademy
    if (!user.username)
      return sendError(
        400,
        "You cannot create an annexlly link without having a username",
        reply
      );

    const formattedName = name.replace(" ", "-");
    const id = ulid();
    const newPath = `/${user.username}/${formattedName}`;
    await Annexlly.create({
      id,
      newPath,
      defaultUrl,
      createdAt: new Date().toISOString(),
      userId,
      numOfClicks: 0,
      name: formattedName,
    });

    return reply.send({ msg: "successfully created" });
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

module.exports = {
  getAllAnnexllyHandler,
  getAnnexllyHandler,
  createAnnexllyHandler,
};
