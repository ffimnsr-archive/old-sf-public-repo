import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import uuid from "uuid";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";
import compression from "compression";
import mongoose from "mongoose";

import { default as routes } from "./routes";

// Check if running in production environment
const isProduction = process.env.NODE_ENV === "production";

// Create express server
const app = express();

// MongoDB configuration
if (isProduction) {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/connect");
  mongoose.set("debug", true);
}

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(compression());

// Passport configuration
app.use(passport.initialize());
require("./config/passport");

// Load routes
app.use(routes);

// Assign an identifier for every requests
function assignId(req: Request, res: Response, next: NextFunction) {
  (<any>req).id = uuid.v4();
  next();
}

app.use(assignId);

// Log requests
morgan.token("id", function(req: any) {
  return req.id;
});

app.use(morgan(":id :method :url :response-time"));

app.use((req: Request, res: Response, next: NextFunction) => {
  const err = new Error("Not Found");
  (<any>err).status = 404;
  next(err);
});

if (!isProduction) {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);

    res.status((<any>err).status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
} else {
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status((<any>err).status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {}
      }
    });
  });
}

export default app;
