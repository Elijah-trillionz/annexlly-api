const app = require("fastify")({ logger: true });
const PORT = process.env.PORT || 5002;
require("dotenv").config();

app.register(require("@fastify/cors"), {
  origin: ["http://localhost:3000"],
});

// register routes
app.register(require("./routes/users"), { prefix: "/api/users" });

app.get("/", (req, reply) => {
  reply.send("Hello world");
});

(async () => {
  try {
    await app.listen({ port: PORT });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
