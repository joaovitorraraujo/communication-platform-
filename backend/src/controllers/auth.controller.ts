import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "../lib/prisma";
import { hashSync, compareSync } from "bcrypt";
import { usersType } from "../models/users";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";

export const signUpController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, cpf, birth }: usersType = req.body;

    let existingUser = await prismaClient.user.findFirst({
      where: {
        OR: [{ email: email }, { cpf: cpf }],
      },
    });

    if (existingUser) {
      res.status(409).json({ message: "User already exists" });
      return;
    }

    existingUser = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        cpf,
        birth,
        type: "PF",
      },
    });

    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({ existingUser, token });
  } catch (error) {
    next(error);
  }
};

export const signInController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password }: usersType = req.body;

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });
    if (!existingUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isValid = compareSync(password, existingUser!.password);

    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }

    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ existingUser, token });
  } catch (error) {
    next(error);
  }
};
