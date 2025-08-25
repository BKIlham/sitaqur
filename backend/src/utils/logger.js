import { createLogger, format, transports } from "winston";

const isProd = process.env.NODE_ENV === "production";

const logger = createLogger({
  level: isProd ? "info" : "debug",
  format: format.combine(
    format.timestamp(),
    isProd ? format.json() : format.colorize({ all: true }),
    isProd
      ? format.uncolorize()
      : format.printf(({ level, message, timestamp, ...meta }) => {
          const rest = Object.keys(meta).length ? `${JSON.stringify(meta)}` : "";
          return `[${timestamp}] ${level}: ${message}${rest}`;
        })
  ),
  transports: [new transports.Console()],
});

logger.levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

export const morganStream = {
  write: (message) => (logger.http ? logger.http(message.trim()) : logger.info(message.trim())),
};

export default logger;
