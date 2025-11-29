# Telegram Bot Server

This folder packages the Telegram bot so it can run without the full backend API server.

## Quick start

1. Copy your existing environment variables or create a new `.env` file. You can either:
   - Place the `.env` file next to `server.js`, or
   - Keep using `src/backend/.env` and point to another file with `BOT_ENV_PATH=/absolute/path/to/.env`.
2. Choose a data mode:
   - `TELEGRAM_BOT_DATA_MODE=direct` (default) — bot to'g'ridan-to'g'ri MongoDB bilan ishlaydi. `MONGO_URI` ni to'ldiring.
   - `TELEGRAM_BOT_DATA_MODE=api` — bot backend REST API orqali hisobotlarni oladi. `BACKEND_API_URL` ni kiriting va backend `/api/auth/login` endpointi ochiq ekanligiga ishonch hosil qiling.
   - Har ikkala rejimda ham `TELEGRAM_BOT_TOKEN` va kerak bo'lsa webhook sozlamalarini ( `TELEGRAM_BOT_WEBHOOK_URL`, `TELEGRAM_BOT_WEBHOOK_SECRET`, `TELEGRAM_BOT_WEBHOOK_PATH` ) kiriting. `BOT_SERVER_PORT` standart bo'yicha `4500`.
3. (Optional) Disable the embedded bot in the main backend by setting `TELEGRAM_BOT_MODE=external` in `src/backend/.env` (or the deployment environment).
4. Install dependencies and start the process:

```bash
cd telegram-bot-server
npm install
npm run dev
# or npm start
```

Depending on the data mode, the script MongoDB ga ulanadi yoki backend API bilan ishlaydi, so'ng Telegram botni ishga tushirib, webhook endpointini taqdim etadi.
