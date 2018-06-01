import errorhandler from "errorhandler";
import dotenv from "dotenv";
import app from "./app";

// Load environment variables from .env file
dotenv.config({ path: ".env" });

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  app.use(errorhandler());
}

const server = app.listen(app.get("port"), () => {
  console.log(` Server is running at http://localhost:${app.get("port")} in ${app.get("env")} mode.`);
  console.log(" Maintained by @ffimnsr.");
  console.log(" Press Ctrl-C to stop the server.\n");
});

export default server;
