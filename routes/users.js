const { registerViaGoogleSchema } = require("../controllers/schemas/users");
const { registerViaGoogleHandler } = require("../controllers/handlers/users");
const registerViaGoogleOpts = {
  schema: registerViaGoogleSchema,
  handler: registerViaGoogleHandler,
};

const usersRoutes = (fastify, opts, done) => {
  // sign in
  fastify.get("/signin", registerViaGoogleOpts);

  // temp
  fastify.get("/register/callback", (req, reply) => {
    reply.redirect(`/api/users/signin?code=${req.query.code}`);
  });

  done();
};

module.exports = usersRoutes;

// https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=258549199436-odp519uffrsvguv7aavngp4q92nivatp.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A5002%2Fapi%2Fusers%2Fregister%2Fcallback&response_type=code&access_type=offline&scope=profile%20email&service=lso&o2v=2&flowName=GeneralOAuthFlow
