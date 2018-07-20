import errorhandler from "errorhandler";
import dotenv from "dotenv";
import winston from "winston";
import app from "./app";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

winston.level = "debug";
winston.add(winston.transports.File, { filename: "combined.log" });

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  app.use(errorhandler());
}

const server = app.listen(app.get("port"), "0.0.0.0", () => {
  winston.info(`  Server is running at http://localhost:${app.get("port")} in ${app.get("env")} mode.`);
  winston.info("  Maintained by @ffimnsr.");
  winston.info("  Press Ctrl-C to stop the server.");
});

export default server;
