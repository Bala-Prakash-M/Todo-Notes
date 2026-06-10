import app from "./app.js";
import dns from "node:dns/promises";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
})
