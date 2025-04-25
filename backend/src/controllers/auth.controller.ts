import { NextFunction, Request, RequestHandler, Response } from "express";
import { prismaClient } from "../lib/prisma";
import { hashSync, compareSync } from "bcrypt";
import { usersType } from "../models/users";

export const signUpController: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, name, cpf, birth }: usersType = req.body;

    let user = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      res.json({ message: "User already exists" });
    }

    user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 10),
        cpf,
        birth,
      },
    });

    res.status(201).json(user);
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

    const user = await prismaClient.user.findFirst({ where: { email } });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    const isValid = compareSync(password, user!.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
