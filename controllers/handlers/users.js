const axios = require("axios");
const Users = require("../../models/Users");
const { ulid } = require("ulid");
const jwt = require("jsonwebtoken");

const registerViaGoogleHandler = async (req, reply) => {
  const { code } = req.query;
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

const sendError = (statusCode, msg, replyCb) => {
  return replyCb.status(statusCode).send(new Error(msg));
};

module.exports = { registerViaGoogleHandler };
