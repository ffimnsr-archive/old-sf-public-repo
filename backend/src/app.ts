import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import uuid from "uuid";
import cors from "cors";
import passport from "passport";
import helmet from "helmet";

import * as chome from "./controllers/home";
import * as capi from "./controllers/api";

import * as passportConfig from "./config/passport";

// Create express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(cors());
app.use(helmet());

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

app.get("/", chome.index);
app.get("/api", capi.getHello);

export default app;
