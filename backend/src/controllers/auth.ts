import { Request, Response } from "express";
import { prismaClient } from "..";
import { hashSync } from "bcrypt";
import { usersType } from "../models/users";

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
