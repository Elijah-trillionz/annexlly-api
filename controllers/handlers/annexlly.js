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
    const formattedName = name.replaceAll(" ", "-");
    const annexllyNameExists = await Annexlly.findOne({
      name: formattedName,
      userId,
    });
    if (annexllyNameExists?.id)
      return sendError(
        400,
        "You've used a similar name to create an annexlly link, use another",
        reply
      );

    const annexllyLinkExists = await Annexlly.findOne({ defaultUrl, userId });
    if (annexllyLinkExists?.id)
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

const updateAnnexllyHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { name, defaultUrl } = req.body;
  const { id } = req.params;

  try {
    const annexlly = await Annexlly.findOne({ id, userId });
    if (!annexlly)
      return sendError(404, "This annexlly link does not exist", reply);

    const formattedName = name.replaceAll(" ", "-");
    const annexllyNameExists = await Annexlly.findOne({
      name: formattedName,
      userId,
    });
    if (annexllyNameExists && annexllyNameExists.id !== id)
      return sendError(
        400,
        "You've used a similar name to create an annexlly link, use another",
        reply
      );

    const annexllyLinkExists = await Annexlly.findOne({ defaultUrl, userId });
    if (annexllyLinkExists && annexllyLinkExists?.id !== id)
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

    const newPath = `/${user.username}/${formattedName}`;
    await Annexlly.findOneAndUpdate(
      { id },
      {
        newPath,
        defaultUrl,
        name: formattedName,
      }
    );

    return reply.send({ msg: "successfully updated" });
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

const deleteAnnexllyHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    const annexlly = await Annexlly.findOneAndDelete({ id, userId });
    if (!annexlly)
      return sendError(404, "This annexlly link does not exist", reply);

    return reply.send({ msg: "successfully deleted" });
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

const incrementNumOfClicksHandler = async (req, reply) => {
  const { id: userId } = req.user;
  const { id } = req.params;

  try {
    await Annexlly.findOneAndUpdate(
      { id, userId },
      { $inc: { numOfClicks: 1 } }
    );

    return reply.send({ msg: "successfully incremented" });
  } catch (e) {
    if (e?.errorCode === 612) {
      return sendError(404, "This annexlly link does not exist", reply);
    }
    return sendError(500, "Server error", reply);
  }
};

module.exports = {
  getAllAnnexllyHandler,
  getAnnexllyHandler,
  createAnnexllyHandler,
  updateAnnexllyHandler,
  deleteAnnexllyHandler,
  incrementNumOfClicksHandler,
};
