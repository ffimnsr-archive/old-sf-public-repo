import jwt from "express-jwt";
import { Request } from "express";

import { secret } from "../config";

function getTokenFromHeader(req: Request) {
  if (req.headers.authorization) {
    let signature: string = req.headers.authorization.split(" ")[0];
    switch (signature) {
      case "Token":
      case "Bearer":
        return req.headers.authorization.split(" ")[1];
      default:
        break;
    }
  }

  return null;
}

let Auth = {
  required: jwt({
    secret: secret,
    userProperty: "payload",
    getToken: getTokenFromHeader
  }),
  optional: jwt({
    secret: secret,
    userProperty: "payload",
    credentialsRequired: false,
    getToken: getTokenFromHeader
  })
};

export default Auth;
