const axios = require("axios");
const Users = require("../../models/Users");
const { ulid } = require("ulid");
const jwt = require("jsonwebtoken");

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

const registerViaGoogleHandler = async (req, reply) => {
  const { code } = req.body;
  try {
    const accessToken = await exchangeCodeForToken(code);
    if (accessToken.error) return sendError(400, "Invalid code", reply);

    const { email, picture, name } = await getUserProfile(accessToken);

    const userExists = await Users.findOne({ email });
    let id = ulid();
    if (!userExists) {
      await Users.create({
        id,
        email,
        picture,
        name,
        username: "",
      });
    } else {
      id = userExists.id;
    }

    jwt.sign(
      { id },
      process.env.JWT_SECRET,
      { expiresIn: 60 * 60 * 24 * 100 },
      (err, token) => {
        if (err) throw err;

        return reply.send({ token });
      }
    );

    await reply;
  } catch (e) {
    sendError(500, "A server error occurred", reply);
  }
};

const exchangeCodeForToken = async (code) => {
  try {
    const res = await axios.default({
      url: "https://oauth2.googleapis.com/token",
      params: {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.REDIRECT_URI,
      },
      method: "post",
    });

    return res.data.access_token;
  } catch (e) {
    return e?.response?.data;
  }
};

const getUserProfile = async (accessToken) => {
  try {
    const profile = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const { name, email, picture } = profile.data;
    return { email, name, picture };
  } catch (e) {
    return e?.response?.data;
  }
};

const getSignedInUserHandler = async (req, reply) => {
  const { id } = req.user;
  try {
    const user = await Users.findOne({ id });
    if (!user)
      return sendError(
        401,
        "This user does not exist. Account may have been deleted",
        reply
      );

    reply.send(user);
  } catch (e) {
    sendError(500, "Server error", reply);
  }
};

const updateUsernameHandler = async (req, reply) => {
  const { id } = req.user;
  const { username } = req.body;
  try {
    if (!username)
      return sendError(400, "Username property must have a value", reply);

    const usernameExists = await Users.findOne({
      username: username.toLowerCase(),
    });
    if (usernameExists && usernameExists.id !== id) {
      return sendError(
        400,
        "This username is already in use by someone else",
        reply
      );
    } else if (usernameExists && usernameExists.id === id) {
      return sendError(400, "This username is already in use by you", reply);
    }

    const user = await Users.findOneAndUpdate(
      { id },
      { username: username.toLowerCase() }
    );
    if (!user)
      return sendError(
        401,
        "This user does not exist. Account may have been deleted",
        reply
      );
    reply.send({ msg: "Username updated" });
  } catch (e) {
    return sendError(500, "Server error", reply);
  }
};

module.exports = {
  registerViaGoogleHandler,
  getSignedInUserHandler,
  updateUsernameHandler,
  sendError,
};
