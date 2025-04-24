import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync, compareSync } from "bcrypt";
import { usersType } from "../models/users";
import * as jwt from "jsonwebtoken";

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name, cpf, birth }: usersType = req.body;

  let user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (user) {
    throw new Error("User already exists");
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
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password }: usersType = req.body;

  const user = await prismaClient.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (!compareSync(password, user.password)) {
    throw new Error("Invalid password");
  }
};
