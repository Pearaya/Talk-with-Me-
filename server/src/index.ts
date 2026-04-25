import { createApp } from "./app";
import { config } from "./config";
import { prisma } from "./lib/db";

const app = createApp();

const server = app.listen(config.port, () => {
  console.log(`[server] listening on http://localhost:${config.port}`);
});

const shutdown = async (signal: string) => {
  console.log(`\n[server] received ${signal}, shutting down...`);
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
