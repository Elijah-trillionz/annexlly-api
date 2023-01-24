const jwt = require("jsonwebtoken");

const verifyUserToken = (req, reply, done) => {
  const { access_token: token } = req.headers;

  jwt.verify(token, process.env.JWT_SECRET, {}, (err, decoded) => {
    if (err) {
      done(new Error("You are not authorized to access this"));
    }

    req.user = {
      id: decoded.id,
    };
  });

  done();
};

module.exports = { verifyUserToken };
