import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "../src/backend/config/db.js";
import { initTelegramBot } from "../src/backend/services/telegramBot.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const resolveEnvPath = () => {
  const fallback = path.resolve(__dirname, "../env");
  const custom = process.env.BOT_ENV_PATH;
  return custom && custom.trim() ? custom.trim() : fallback;
};

const envPath = resolveEnvPath();
const result = dotenv.config({ path: envPath });
if (result.error) {
  dotenv.config();
}

process.on("unhandledRejection", (reason) => {
  console.error("[TelegramBotServer] Unhandled rejection", reason);
});

process.on("uncaughtException", (error) => {
  console.error("[TelegramBotServer] Uncaught exception", error);
});

const app = express();
app.use(express.json({ limit: "5mb" }));

const dataMode = (process.env.TELEGRAM_BOT_DATA_MODE || "direct").toLowerCase();
const shouldConnectDatabase = dataMode !== "api";

const start = async () => {
  if (shouldConnectDatabase) {
    await connectDB();
  } else {
    console.info("[TelegramBotServer] API rejim tanlandi, MongoDB ulanmasdan ishga tushmoqda.");
  }

  const bot = initTelegramBot({ app });
  if (!bot) {
    console.warn("[TelegramBotServer] TELEGRAM_BOT_TOKEN topilmadi yoki bot ishga tushmadi.");
  }

  app.get("/", (req, res) => {
    res.json({ ok: true, botReady: Boolean(bot) });
  });

  const port = Number(process.env.BOT_SERVER_PORT || process.env.PORT || 4500);
  app.listen(port, () => {
    console.log(`[TelegramBotServer] Listening on port ${port}`);
    console.log(`[TelegramBotServer] Env file: ${envPath}`);
  });
};

start().catch((error) => {
  console.error("[TelegramBotServer] Startup failure", error);
  process.exit(1);
});
