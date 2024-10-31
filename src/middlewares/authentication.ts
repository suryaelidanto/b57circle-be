import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type UserJWTPayload = {
  id: number;
  name: string;
  address: string;
  password?: string;
  email: string;
  iat: number;
  exp: number;
};

export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  let decoded = jwt.verify(token, "SECRETKEY") as UserJWTPayload

  if (!decoded) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  delete decoded.password

  res.locals.user = decoded;

  next();
};
