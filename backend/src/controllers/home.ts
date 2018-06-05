import { Request, Response } from "express";

export let index = (req: Request, res: Response) => {
  res.status(200).json({
    title: "Home",
  });
};
