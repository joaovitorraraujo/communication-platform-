import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res.sendStatus(401).json({ message: "Unauthorized" });
    return;
  }

  const [, token] = authorization.split(" ");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const { id } = decoded as TokenPayload;

    console.log("User ID from token:", id);

    req.userId = Number(id);

    next();
  } catch (error) {
    res.sendStatus(401).json({ message: "Unauthorized" });
    return;
  }
}
