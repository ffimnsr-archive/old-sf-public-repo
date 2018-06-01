import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import uuid from "uuid";
import cors from "cors";

import * as passportConfig from "./config/passport";

// Create express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

export default app;
