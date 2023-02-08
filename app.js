const app = require("./server");
const client = require("./services/redis");

(async () => {
  // connect to the database first.
  await client.connect();
  app.listen(3000);
})()
