const app = require("fastify")({ logger: true });
const { verifyUserToken } = require("./auth/verifyUserToken");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5002;
require("dotenv").config();
connectDB();

app.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000"],
});

app.decorate("verifyUserToken", verifyUserToken);

// register routes
app.register(require("./routes/users"), { prefix: "/api/users" });
app.register(require("./routes/annexlly"), { prefix: "/api/annexlly" });

app.get("/", async (req, reply) => {
  reply.send("Hello World");
});

(async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
