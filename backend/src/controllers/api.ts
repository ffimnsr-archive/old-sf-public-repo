"use strict";

import async from "async";
import request from "request";
import { Request, Response, NextFunction } from "express";

export let getHello = (req: Request, res: Response) => {
  res.status(200).json({
    title: "API Examples"
  });
};

